import prisma from '../../config/database.js';
import client from '../../config/gpt.js';

export const generateTasksAI = async ({desctription, deadline, teamSize }) => {
    const promt = `You are a profesional project manager. 
    Break down this project into structured actionable tasks.
    Project:
    ${desctription}

    Deadline: 
    ${deadline}

    Team Size: 
    ${teamSize} 
    
    return striclty in JSON array:
    [
        {
            "title": "",
            "description": "",
            "priority": "low | medium | high",
            "estimated_days": number
        }
    ]
    `;

    const response = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
            { role: "system", content: "You are a senior project manager" },
            { role: "user", content: promt }
        ],
        temperature: 0.7,
    });

    const tasksData = JSON.parse(response.choices[0].message.content);

    const project = await prisma.project.create({
        data: {
            name,
            desctription,
            deadline: new Date(deadline),
            companyId: user.companyId,
            ownerId: user.id
        }
    });

    const createTasks = await prisma.task.createMany({
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
        tasksCreated: createTasks.count
    };
};