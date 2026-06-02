import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CommunicationService } from './communication.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { PaginationDto } from '../../common/dto/pagination.dto';

@ApiTags('Communication')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller({ path: 'communication', version: '1' })
export class CommunicationController {
  constructor(private readonly communicationService: CommunicationService) {}

  @Get('announcements') @ApiOperation({ summary: 'Get announcements' })
  getAnnouncements(@Query() query: PaginationDto, @Query('role') role?: string, @CurrentUser() user?: any) {
    return this.communicationService.getAnnouncements({ ...query, role: role || user?.role });
  }

  @Post('announcements') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create announcement' })
  createAnnouncement(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.communicationService.createAnnouncement(dto, userId);
  }

  @Get('circulars') @ApiOperation({ summary: 'Get circulars' })
  getCirculars(@Query() query: PaginationDto) { return this.communicationService.getCirculars(query); }

  @Post('circulars') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Issue circular' })
  createCircular(@Body() dto: any, @CurrentUser('id') userId: string) { return this.communicationService.createCircular(dto, userId); }

  @Get('messages') @ApiOperation({ summary: 'Get my messages' })
  getMessages(@CurrentUser('id') userId: string, @Query() query: PaginationDto) {
    return this.communicationService.getMessages(userId, query);
  }

  @Post('messages') @ApiOperation({ summary: 'Send a message' })
  sendMessage(@CurrentUser('id') userId: string, @Body() dto: any) { return this.communicationService.sendMessage(userId, dto); }

  @Get('notifications') @ApiOperation({ summary: 'Get my notifications' })
  getNotifications(@CurrentUser('id') userId: string, @Query() query: PaginationDto) {
    return this.communicationService.getNotifications(userId, query);
  }

  @Patch('notifications/:id/read') @ApiOperation({ summary: 'Mark notification as read' })
  markRead(@Param('id', ParseUUIDPipe) id: string) { return this.communicationService.markNotificationRead(id); }

  @Patch('notifications/read-all') @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllRead(@CurrentUser('id') userId: string) { return this.communicationService.markAllNotificationsRead(userId); }

  // ─── Broadcast ────────────────────────────────────────────────────────────
  @Post('broadcast') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Broadcast message to role(s)' })
  broadcast(@Body() dto: any, @CurrentUser('id') userId: string) {
    return this.communicationService.broadcastMessage({ ...dto, createdBy: userId });
  }

  // ─── Events ───────────────────────────────────────────────────────────────
  @Get('events') @ApiOperation({ summary: 'Get school events' })
  getEvents(@Query() query: PaginationDto) { return this.communicationService.getEvents(query); }

  @Post('events') @Roles('SCHOOL_ADMIN') @ApiOperation({ summary: 'Create school event' })
  createEvent(@Body() dto: any, @CurrentUser('id') userId: string) { return this.communicationService.createEvent(dto, userId); }
}
