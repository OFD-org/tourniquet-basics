import { Controller, Post, Body, UseGuards, Request, Get, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private configService: ConfigService,
    ) { }

    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'Return JWT token.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('signup')
    @ApiOperation({ summary: 'Sign up user' })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    async signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'Return user profile.' })
    getProfile(@Request() req) {
        return req.user;
    }

    // ─── Google OAuth ────────────────────────────────────────────────────────────

    @Get('google')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Initiate Google OAuth flow' })
    googleAuth() {
        // Passport redirects to Google automatically — no body needed
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    @ApiOperation({ summary: 'Google OAuth callback' })
    async googleAuthCallback(@Request() req, @Res() res) {
        const { access_token } = await this.authService.googleLogin(req.user);

        // Redirect the user back to the frontend with the token as a query param.
        // The frontend reads the token from the URL and stores it (e.g. in localStorage).
        const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3000';
        res.redirect(`${frontendUrl}/auth/callback?token=${access_token}`);
    }
}
