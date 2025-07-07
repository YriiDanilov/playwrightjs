import { expect, Locator, Page, test } from '@playwright/test';

interface ITestElements extends Array<ITestElement> {}
interface IAttribute {
  type: string;
  value: string;
}
interface ITestElement {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: IAttribute;
}

const elements: ITestElements = [
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

const lightModes = ['light', 'dark'];

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Проверка отображения элементов навигации хедера', async ({ page }) => {
    await Promise.all(
      elements.map(async ({ locator, name }) => {
        await test.step(`Проверка отображения элемента ${name}`, async () => {
          await expect.soft(locator(page)).toBeVisible();
        });
      }),
    );
  });

  test('Проверка названия элементов навигации хедера', async ({ page }) => {
    await Promise.all(
      elements.map(async ({ locator, name, text }) => {
        if (text) {
          await test.step(`Проверка названия элемента ${name}`, async () => {
            await expect.soft(locator(page)).toContainText(text);
          });
        }
      }),
    );
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
    await Promise.all(
      elements.map(async ({ locator, name, attribute }) => {
        if (attribute) {
          await test.step(`Проверка аттрибута элемента ${name}`, async () => {
            await expect.soft(locator(page)).toHaveAttribute(attribute.type, attribute.value);
          });
        }
      }),
    );
  });

  test('Проверка переключения light мода', async ({ page }) => {
    await page.getByLabel('Switch between dark and light mode (currently system mode)').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  lightModes.forEach((value) => {
    test(`Проверка стилей активного ${value} мода`, async ({ page }) => {
      await page.evaluate((value) => {
        document.querySelector('html')?.setAttribute('data-theme', value);
      }, value);

      await expect(page).toHaveScreenshot(`pageWith${value}Mode.png`);
    });
  });
});
