import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/office-management',
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  private readonly logger = new Logger(EventsGateway.name);
  private connectedClients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    const clientId = client.id;
    this.connectedClients.set(clientId, client);
    this.logger.log(`Client connected: ${clientId}`);
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
    
    // Send welcome message
    client.emit('connected', {
      message: 'Connected to Office Management WebSocket',
      clientId,
      timestamp: new Date().toISOString(),
    });
  }

  handleDisconnect(client: Socket) {
    const clientId = client.id;
    this.connectedClients.delete(clientId);
    this.logger.log(`Client disconnected: ${clientId}`);
    this.logger.log(`Total connected clients: ${this.connectedClients.size}`);
  }

  @SubscribeMessage('ping')
  handlePing(client: Socket, data: any): void {
    this.logger.log(`Ping from client: ${client.id}`);
    client.emit('pong', {
      message: 'pong',
      timestamp: new Date().toISOString(),
      data,
    });
  }

  // Company Events
  emitCompanyCreated(data: any) {
    this.server.emit('company_created', {
      event: 'company_created',
      data,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted company_created event`);
  }

  emitCompanyUpdate(data: any) {
    this.server.emit('company_updated', {
      event: 'company_updated',
      data,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted company_updated event`);
  }

  emitCompanyDeleted(id: string) {
    this.server.emit('company_deleted', {
      event: 'company_deleted',
      data: { id },
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted company_deleted event for ID: ${id}`);
  }

  // Employee Events
  emitEmployeeCreated(data: any) {
    this.server.emit('employee_created', {
      event: 'employee_created',
      data,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted employee_created event`);
  }

  emitEmployeeUpdate(data: any) {
    this.server.emit('employee_updated', {
      event: 'employee_updated',
      data,
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted employee_updated event`);
  }

  emitEmployeeDeleted(id: string) {
    this.server.emit('employee_deleted', {
      event: 'employee_deleted',
      data: { id },
      timestamp: new Date().toISOString(),
    });
    this.logger.log(`Emitted employee_deleted event for ID: ${id}`);
  }

  // Broadcast custom events
  broadcastEvent(event: string, data: any) {
    this.server.emit(event, {
      event,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  // Get connected clients count
  getConnectedClientsCount(): number {
    return this.connectedClients.size;
  }

  // Send message to specific client
  sendToClient(clientId: string, event: string, data: any) {
    const client = this.connectedClients.get(clientId);
    if (client) {
      client.emit(event, data);
    }
  }
}