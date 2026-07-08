import { prisma } from "../lib/prisma.js"

function parseMinecraftCommands(commandsText: string): string[] {
  try {
    const parsed = JSON.parse(commandsText)

    if (!Array.isArray(parsed)) {
      return []
    }

    return parsed.map((command) => String(command))
  } catch {
    return []
  }
}

export class DeliveriesService {
  async findPending(server: string) {
    const deliveries = await prisma.delivery.findMany({
      where: {
        server,
        status: "pending",
      },
      select: {
        id: true,
        playerName: true,
        minecraftCommands: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    return deliveries.map((delivery) => ({
      id: delivery.id,
      player_name: delivery.playerName,
      commands: parseMinecraftCommands(delivery.minecraftCommands),
    }))
  }

  async confirm(id: string) {
    return await prisma.delivery.updateMany({
      where: {
        id,
        status: "pending",
      },
      data: {
        status: "delivered",
        deliveredAt: new Date(),
      },
    })
  }
}