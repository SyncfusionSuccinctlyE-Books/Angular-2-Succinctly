import { HelloworldPage } from './app.po';

describe('helloworld App', function() {
  let page: HelloworldPage;

  beforeEach(() => {
    page = new HelloworldPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
