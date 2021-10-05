const routes = {
    home: '/',
    signin: '/signin',
    signup: '/signup',
    account: '/account',
    admin: {
        users: '/admin/users',
        user: (userId) => (userId ? `/admin/users/:${userId}` : '/admin/users/userId') ,
        projects: '/admin/projects',
    }
}

export default routes;