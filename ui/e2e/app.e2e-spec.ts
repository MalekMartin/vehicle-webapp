import { VehiclesAppPage } from './app.po';

describe('vehicles-app App', () => {
  let page: VehiclesAppPage;

  beforeEach(() => {
    page = new VehiclesAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
