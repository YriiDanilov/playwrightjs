import { test, expect } from '../fixtures/mainPage';

test.describe('тесты главной страницы', () => {
  test('Проверка отображения элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementVisibility();
  });

  test('Проверка названия элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.checkElementsText();
  });

  test('Проверка атрибутов href элементов навигации хедера', async ({ mainPage }) => {
    await mainPage.clickSwitchLightModeIconButton();
    await mainPage.checkElementsHrefAttr();
  });

  test('Проверка переключения light мода', async ({ mainPage }) => {
    await test.step('Нажатие на иконку переключения light мода', async () => {
      await mainPage.clickSwitchLightModeIconButton();
    });
    await test.step('Проверка смены значения атрибута', async () => {
      await mainPage.checkDataThemeAttributeValue();
    });
  });

  test('Проверка стилей со светлой темой', async ({ mainPage }) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLigthMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test('Проверка стилей с темной темой', async ({ mainPage }) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
