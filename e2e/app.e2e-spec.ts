import { Angular4ChinaPage } from './app.po';

describe('angular4-china App', () => {
  let page: Angular4ChinaPage;

  beforeEach(() => {
    page = new Angular4ChinaPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
