import test, { Page, Locator, expect } from '@playwright/test';

interface IAttribute {
  type: string;
  value: string;
}

interface IElements extends Array<ITestElement> {}

interface ITestElement {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: IAttribute;
}

export class MainPage {
  readonly page: Page;
  readonly elements: IElements;

  constructor(page: Page) {
    this.page = page;
    this.elements = [
      {
        locator: (page) => page.getByRole('link', { name: 'Playwright logo Playwright' }),
        name: 'Playwright logo link',
        text: 'Playwright',
        attribute: {
          type: 'href',
          value: '/',
        },
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Docs' }),
        name: 'Docs link',
        text: 'Docs',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
      {
        locator: (page) => page.getByRole('link', { name: 'API' }),
        name: 'Api link',
        text: 'API',
        attribute: {
          type: 'href',
          value: '/docs/api/class-playwright',
        },
      },
      {
        locator: (page) => page.getByRole('button', { name: 'Node.js' }),
        name: 'Node.js button',
        text: 'Node.js',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Community' }),
        name: 'Community link',
        text: 'Community',
        attribute: {
          type: 'href',
          value: '/community/welcome',
        },
      },
      {
        locator: (page) => page.getByRole('link', { name: 'GitHub repository' }),
        name: 'GitHub icon',
        attribute: {
          type: 'href',
          value: 'https://github.com/microsoft/playwright',
        },
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Discord server' }),
        name: 'Discord icon',
        attribute: {
          type: 'href',
          value: 'https://aka.ms/playwright/discord',
        },
      },
      {
        locator: (page) => page.getByRole('button', { name: 'Switch between dark and light' }),
        name: 'Light icon',
      },
      {
        locator: (page) => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
        name: 'Search input',
      },
      {
        locator: (page) => page.getByRole('heading', { name: 'Playwright enables reliable' }),
        name: 'Title',
        text: 'Playwright  enables reliable end-to-end testing for modern web apps.',
      },
      {
        locator: (page) => page.getByRole('link', { name: 'Get started' }),
        name: 'Get Started Button',
        text: 'Get started',
        attribute: {
          type: 'href',
          value: '/docs/intro',
        },
      },
    ];
  }

  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  async checkElementVisibility() {
    await Promise.all(
      this.elements.map(async ({ locator, name }) => {
        await test.step(`Проверка отображения элемента ${name}`, async () => {
          await expect.soft(locator(this.page)).toBeVisible();
        });
      }),
    );
  }

  async checkElementsText() {
    await Promise.all(
      this.elements.map(async ({ locator, text, name }) => {
        if (text) {
          await test.step(`Проверка текста элемента ${name}`, async () => {
            await expect.soft(locator(this.page)).toContainText(text);
          });
        }
      }),
    );
  }

  async checkElementsHrefAttr() {
    await Promise.all(
      this.elements.map(async ({ locator, name, text, attribute }) => {
        await test.step(`Проверка атрибута href у элемента ${name}`, async () => {
          if (attribute) {
            await expect
              .soft(locator(this.page))
              .toHaveAttribute(attribute?.type, attribute?.value);
          }
        });
      }),
    );
  }

  async clickSwitchLightModeIconButton() {
    await this.page
      .getByLabel('Switch between dark and light mode (currently system mode)')
      .click();
  }

  async checkDataThemeAttributeValue() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }

  async setLigthMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  async checkLayoutWithLightMode() {
    await expect(this.page).toHaveScreenshot('pageWithLightMode.png', {
      threshold: 0.1,
    });
  }

  async checkLayoutWithDarkMode() {
    await expect(this.page).toHaveScreenshot('pageWithDarkMode.png', {
      threshold: 0.1,
    });
  }
}
