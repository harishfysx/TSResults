import { AngDashBoardPage } from './app.po';

describe('ang-dash-board App', () => {
  let page: AngDashBoardPage;

  beforeEach(() => {
    page = new AngDashBoardPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
