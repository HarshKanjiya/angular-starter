import { AuthService } from "../../services/auth.service";


export function authInitializer(authService: AuthService) {
    return () => authService.validateToken().toPromise().then(isAuthenticated => {
        if (!isAuthenticated) {
            authService.redirectToLogin();
        }
    })
}