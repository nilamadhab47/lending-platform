"use server";

import puppeteer from 'puppeteer';

export async function scrapeAndInteractWithWebsite() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set a reasonable navigation timeout (e.g., 30 seconds)
  await page.setDefaultNavigationTimeout(30000);

  try {
    await page.goto('https://rera.karnataka.gov.in/projectViewDetails');

    // Select Mysore
    await page.select('#projectDist', 'Mysore');

    // Click the search button
    const selectDistrict = await Promise.all([
      page.waitForNavigation(), // Ensure that the page has finished loading after the click
      page.click('input[name=btn1]'),
    ]);

    console.log(selectDistrict, "selectDistrict");

    // Now you can scrape the populated table
    await page.waitForSelector('#approvedTable');

    const tableData = await page.evaluate(() => {
      // Your scraping logic for the table here
      // For example:
      const tableRows = Array.from(document.querySelectorAll('#approvedTable tr'));
      return tableRows.map(row => {
        const columns = row.querySelectorAll('td');
        return Array.from(columns, column => column.innerText);
      });
    });

    console.log(tableData);

    return tableData;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser after completion or in case of an error
    await browser.close();
  }
}
