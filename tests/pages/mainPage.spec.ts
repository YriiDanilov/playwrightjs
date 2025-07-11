import { expect, Locator, Page, test } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Проверка отображения элементов навигации хедера', async () => {
    await mainPage.checkElementVisibility();
  });

  test('Проверка названия элементов навигации хедера', async () => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async () => {
    await mainPage.clickSwitchLightModeIconButton();
    await mainPage.checkElementsHrefAttr();
  });

  test('Проверка переключения light мода', async () => {
    await test.step('Нажатие на иконку переключения light мода', async () => {
      await mainPage.clickSwitchLightModeIconButton();
    });
    await test.step('Проверка смены значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test('Проверка стилей со светлой темой', async () => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLigthMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test('Проверка стилей с темной темой', async () => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
