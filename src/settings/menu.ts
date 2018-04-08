export const MENU: any = [
  {
    title: 'Main',
    groupTitle : true
  },
  {
    title: 'State',
    icon: {
      class: 'fa fa-home',
      bg: '#ea8080',
      color: 'rgba(0,0,0,.87)'
    },
    routing: '/members/state-search',
    sub: [
      {
        title: 'Search',
        routing: '/members/state-search'
      },
      {
        title: 'Analytics',
        routing: '/members/state-analytics'
      }
    ]
  },
  {
    title: 'College',
    icon: {
      class: 'fa fa-table',
      bg: '#FFE082',
      color: 'rgba(0,0,0,.87)'
    },
    routing: '/members/college-search',
    sub: [
      {
        title: 'Classes',
        routing: '/members/college-collections'
      },
      {
        title: 'Search',
        routing: '/members/college-search'
      }
    ]
  }
];
