import assert from "node:assert/strict";
import test from "node:test";
import {
  generateDailySchedule,
  generateRoadmap,
  generateTasks,
  getLanguagePlan,
  getPlanningContext,
  normalizePreferredLanguage,
  shouldShowLanguageOnboarding,
} from "./planningService.ts";

test("normalizes supported language values and safely rejects unknown values", () => {
  assert.equal(normalizePreferredLanguage("python"), "Python");
  assert.equal(normalizePreferredLanguage("cpp"), "C++");
  assert.equal(normalizePreferredLanguage("not-a-language"), undefined);
});

test("onboarding is shown only when a valid preference is missing", () => {
  assert.equal(shouldShowLanguageOnboarding(null), true);
  assert.equal(shouldShowLanguageOnboarding({}), true);
  assert.equal(shouldShowLanguageOnboarding({ preferredLanguage: "Java" }), false);
  assert.equal(shouldShowLanguageOnboarding({ preferredLanguage: "Python" }), false);
  assert.equal(shouldShowLanguageOnboarding({ preferredLanguage: "invalid" as never }), true);
});

test("planning content changes with the selected language", () => {
  const java = getPlanningContext({ preferredLanguage: "Java" } as never);
  const python = getPlanningContext({ preferredLanguage: "Python" } as never);
  const javaPlan = getLanguagePlan(java.preferredLanguage);
  const pythonPlan = getLanguagePlan(python.preferredLanguage);

  assert.notEqual(javaPlan.setupTask, pythonPlan.setupTask);
  assert.notEqual(javaPlan.syntaxExample, pythonPlan.syntaxExample);
  assert.notEqual(generateTasks(java)[0].title, generateTasks(python)[0].title);
  assert.notEqual(generateDailySchedule(java)[0].resource, generateDailySchedule(python)[0].resource);
  assert.notEqual(generateRoadmap(java)[0].label, generateRoadmap(python)[0].label);
});

test("planning context preserves academic and target settings while switching language", () => {
  const context = getPlanningContext({ preferredLanguage: "C++", academicYear: 2, semester: 2, targetYear: 2031 } as never);
  assert.deepEqual(context, { preferredLanguage: "C++", academicYear: 2, semester: 2, targetYear: 2031, dailyStudyHours: 2 });
});