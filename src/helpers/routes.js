const routes = {
    home: '/',
    signin: '/signin',
    signup: '/signup',
    account: '/account',
    admin: {
        createProject:'/admin/create/project',
        users: '/admin/users',
        user: (userId) => (userId ? `/admin/users/:${userId}` : '/admin/users/userId') ,
        projects: '/admin/projects',
        collaborators: '/admin/projects/:id/collaborators'
    }
}

export default routes;