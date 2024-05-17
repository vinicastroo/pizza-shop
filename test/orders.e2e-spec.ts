import { expect, test } from '@playwright/test'

test('list orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await expect(page.getByRole('cell', { name: 'Customer 0' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 9' })).toBeVisible()
})

test('paginate orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'Proxima pagina' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 10' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 19' })).toBeVisible()

  await page.getByRole('button', { name: 'Ultima pagina' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 50' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 59' })).toBeVisible()

  await page.getByRole('button', { name: 'Pagina anterior' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 40' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 49' })).toBeVisible()

  await page.getByRole('button', { name: 'Primeira pagina' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 0' })).toBeVisible()
  await expect(page.getByRole('cell', { name: 'Customer 9' })).toBeVisible()
})

test('filter by orderId orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('ID do pedido').fill('order-11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'order-11' })).toBeVisible()
})
test('filter by name orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByPlaceholder('Nome do cliente').fill('Customer 11')
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Customer 11' })).toBeVisible()
})
test('filter by status orders', async ({ page }) => {
  await page.goto('/orders', { waitUntil: 'networkidle' })

  await page.getByRole('combobox').click()
  await page.getByLabel('Pendente').click()
  await page.getByRole('button', { name: 'Filtrar resultados' }).click()

  await expect(page.getByRole('cell', { name: 'Pendente' })).toHaveCount(10)
})
