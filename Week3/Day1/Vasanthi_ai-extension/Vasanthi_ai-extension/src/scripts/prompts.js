/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /**
   * TestData generation prompt using Faker library
   * 
   */
  TESTDATA_JSON_MULTIPLE: `
    Instructions:
    - Generate ONLY test data in JSON format (no code, no explanations).
    - [CRITICAL] Produce three grouped arrays at the top level: "positive", "negative", and "edgeCases".
    - [CRITICAL] Each array ("positive", "negative", "edgeCases") MUST contain **exactly {{recordCount}} objects**. Do not generate more or fewer than {{recordCount}} objects per array.
    - For each generated object:
      - Include all fields discovered from the DOM (use the keys derived above).
      - Include a "category" key with value exactly one of: "Positive", "Negative", "Edge Cases".
    - Use Faker library for generating realistic and varied data for each field.
    - Each dataset must contain field values according to its category behavior.
    - Ensure variety and coverage of validations for each category.
    - Maintain strict JSON structure with objects grouped under their respective category.
    - [IMPORTANT] If you generate more or fewer than {{recordCount}} objects in any array, your answer will be rejected.
    - Output ONLY a single JSON object, inside a \`\`\`json\`\`\` block, with this structure:
      \`\`\`json
      {
        "positive": [ /* {{recordCount}} objects */ ],
        "negative": [ /* {{recordCount}} objects */ ],
        "edgeCases": [ /* {{recordCount}} objects */ ]
      }
      \`\`\`


    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example (Readable format):
    \`\`\`
    {
      "positive": [
        { "username": "user01", "password": "Pass@1234", "phone": "+1-202-555-0189" },
        { "username": "testUser", "password": "Valid@456", "phone": "+91-9876543210" }
      ],
      "negative": [
        { "username": "user@@@", "password": "123", "phone": "abc" },
        { "username": "", "password": "short", "phone": "999" }
      ],
      "edgeCases": [
        { "username": " ", "password": "P@ssword!", "phone": null },
        { "username": "averylongusername_exceeding_limit", "password": "Edge@999", "phone": "+44-0000000000" }
      ]
    }
    \`\`\`

    Persona:
    - Audience: QA/Automation engineers needing grouped, structured test data for data-driven testing across Positive, Negative, and Edge Cases.

    Output Format:
    - A single JSON block inside a \`\`\`json\`\`\` block with each category of strictly based on total of {{recordCount}} variable value.

    Tone:
    - Structured, maintainable, enterprise-ready.
  `,

  /**
   * Playwright TypeScript Page Object Prompt (ICE POT)
   */
  PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test/spec code).
    - Use ICE POT framework style (Intent, Context, Example, Persona, Output, Tone).
    - Provide proper TypeScript typings, exported class, constructor accepting Playwright Page.
    - Use Playwright best practices (locators, explicit waits where appropriate), add JSDoc/TSDoc comments.
    - Do NOT include explanations or test runner configuration.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`typescript
    import { Page, Locator } from '@playwright/test';

    /**
     * Page Object for Component Page (ICE POT)
     */
    export class ComponentPage {
      private page: Page;
      private submitBtn: Locator;

      constructor(page: Page) {
        this.page = page;
        this.submitBtn = page.locator('button[type="submit"]');
      }

      /** Click the submit button */
      async clickSubmit() {
        await this.submitBtn.click();
      }
    }
    \`\`\`

    Persona:
    - Audience: Automation engineers using Playwright + TypeScript (ICE POT format).

    Output Format:
    - A single TypeScript file inside a \`\`\`typescript\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber + Playwright TypeScript Step Definitions (ICE POT)
   */
  CUCUMBER_WITH_PLAYWRIGHT_TS_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. TypeScript step definition files using Playwright (no page objects unless explicitly requested).
    - Use ICE POT framework style.
    - Step defs must include Playwright Page usage, proper async/await, and explicit waits where needed.
    - Provide proper imports for @cucumber/cucumber and Playwright.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to Application

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`typescript
    // Example step definition using Playwright + Cucumber (ICE POT)
    import { Given, When, Then, Before, After } from '@cucumber/cucumber';
    import { chromium, Browser, Page } from 'playwright';

    let browser: Browser;
    let page: Page;

    Before(async function() {
      browser = await chromium.launch({ headless: true });
      page = await browser.newPage();
    });

    After(async function() {
      await browser.close();
    });

    Given('I open the login page', async function() {
      await page.goto('\${pageUrl}');
    });

    When('I type {string} into the Username field', async function(username: string) {
      await page.fill('#username', username);
    });

    When('I type {string} into the Password field', async function(password: string) {
      await page.fill('#password', password);
    });

    When('I click the Login button', async function() {
      await page.click('button:has-text("Login")');
    });

    Then('I should be logged in successfully', async function() {
      await page.waitForSelector('.success', { state: 'visible', timeout: 5000 });
    });
    \`\`\`

    Persona:
    - Audience: QA engineers using Playwright + TypeScript with Cucumber.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + TypeScript code in \`\`\`typescript\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `
};

/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY: 'Playwright-Typescript-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  CUCUMBER_WITH_PLAYWRIGHT_TS_STEPS: 'Cucumber-With-Playwright-TS-Steps',
};
