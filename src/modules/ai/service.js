import prisma from "../../config/database.js";

export const generateProjectWithTasksAI = async ({ user, name, description, deadline, teamSize }) => {

    let tasksData;

    try {
        const prompt = `You are a professional project manager.
Break down this project into structured actionable tasks.

Project:
${description}

Deadline:
${deadline}

Team Size:
${teamSize}

Return strictly in JSON array:
[
  {
    "title": "",
    "description": "",
    "priority": "LOW | MEDIUM | HIGH",
    "estimated_days": number
  }
]`;

        const response = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a senior project manager" },
                { role: "user", content: prompt }
            ],
            temperature: 0.7
        });

        tasksData = JSON.parse(response.choices[0].message.content);

    } catch (error) {

        console.log("AI failed, using mock data");

        tasksData = [
            {
                title: "Setup Backend Architecture",
                description: "Initialize Express, Prisma, and middleware",
                priority: "HIGH"
            },
            {
                title: "Implement Authentication",
                description: "Setup JWT and role-based access",
                priority: "HIGH"
            },
            {
                title: "Build Project Module",
                description: "Create CRUD for project",
                priority: "MEDIUM"
            }
        ];
    }

    const project = await prisma.project.create({
        data: {
            name,
            description,
            deadline: new Date(deadline),
            companyId: user.companyId,
            ownerId: user.id
        }
    });

    const createdTasks = await prisma.task.createMany({
        data: tasksData.map(task => ({
            title: task.title,
            description: task.description,
            priority: task.priority || "MEDIUM",
            deadline: new Date(deadline),
            projectId: project.id
        }))
    });

    return {
        project,
        tasksCreated: createdTasks.count
    };
};
