import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";


export default [index("routes/home.tsx"),
    route('/auth/sign-in', 'routes/auth.sign-in.tsx'),
    route('/auth/sign-up', 'routes/auth.sign-up.tsx'),
    route('/upload','routes/upload.tsx'),
    route('/dashboard','routes/dashboard.tsx'),
    route('/profile','routes/profile.tsx'),
    route('/resume/:id','routes/resume.tsx'),
    route('/templates','routes/templates.tsx'),
    route('/build-resume','routes/build-resume.tsx'),
    route('/ai-interviewer','routes/ai-interviewer.tsx')
] satisfies RouteConfig;
