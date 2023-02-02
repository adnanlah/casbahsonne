import {expect, test} from '@playwright/test'

// test('should login and redirect to /lobby', async ({page}) => {
//   await page.goto('/')
//   await page.locator('input').type('adnan')
//   await page.keyboard.press('Enter')
//   await expect(page).toHaveURL(/.*lobby/)
// })

test('should login and redirect to /lobby and create a new room successfully', async ({
  page,
}) => {
  await page.goto('/')
  await page.locator('input').type('adnan')
  await page.keyboard.press('Enter')
  await page.locator('#new-room').click()
  await page.keyboard.press('Enter')
  await expect(page.locator('article')).toHaveCount(1)
})
