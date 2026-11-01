// ⚠️ НЕ ЗАПУСКАВСЯ автором змін: для цього потрібен емулятор Firestore (Java + завантаження з серверів Google),
// а в середовищі, де готувались зміни, мережа до них закрита. Правила перевірено лише структурно (баланс дужок,
// синтаксис функцій) і за кодом клієнта. ЗАПУСТІТЬ цей тест, перш ніж публікувати firestore.rules:
//
//   npm i -D @firebase/rules-unit-testing firebase
//   npx firebase emulators:exec --only firestore "node security-tests/firestore.rules.test.mjs"
//
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { readFileSync } from 'node:fs';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';

const env = await initializeTestEnvironment({ projectId: 'fjord-test', firestore: { rules: readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8') } });
const as = (uid) => env.authenticatedContext(uid, { email: `${uid}@example.com` }).firestore();
let pass = 0, fail = 0;
const t = async (name, p) => { try { await p; pass++; console.log('PASS', name); } catch (e) { fail++; console.log('FAIL', name, '-', String(e.message).slice(0, 100)); } };

await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, 'users/admin1'), { name: 'Admin', admin: true });
  await setDoc(doc(db, 'users/alice'), { name: 'Alice', admin: false });
  await setDoc(doc(db, 'tournaments/T1'), { title: 'T' });
});

// ---- users
await t('owner can update own profile', assertSucceeds(updateDoc(doc(as('alice'), 'users/alice'), { name: 'Alice 2', xp: 5 })));
await t('owner CANNOT make themselves admin', assertFails(updateDoc(doc(as('alice'), 'users/alice'), { admin: true })));
await t('cannot create own doc with admin:true', assertFails(setDoc(doc(as('bob'), 'users/bob'), { name: 'Bob', admin: true })));
await t('can create own doc without admin', assertSucceeds(setDoc(doc(as('carol'), 'users/carol'), { name: 'Carol', email: 'carol@example.com' })));
await t('name longer than 100 chars rejected', assertFails(updateDoc(doc(as('alice'), 'users/alice'), { name: 'x'.repeat(101) })));
await t('name must be a string', assertFails(updateDoc(doc(as('alice'), 'users/alice'), { name: { a: 1 } })));
await t('email must be a string (<=254)', assertFails(updateDoc(doc(as('alice'), 'users/alice'), { email: 'a'.repeat(300) })));
await t("cannot read another user's doc", assertFails(getDoc(doc(as('alice'), 'users/carol'))));
await t('cannot write another user\'s doc', assertFails(updateDoc(doc(as('alice'), 'users/carol'), { name: 'x' })));
await t('admin can read any user', assertSucceeds(getDoc(doc(as('admin1'), 'users/alice'))));
await t('admin can promote another user', assertSucceeds(updateDoc(doc(as('admin1'), 'users/alice'), { admin: true })));
await t('anonymous cannot read users', assertFails(getDoc(doc(env.unauthenticatedContext().firestore(), 'users/alice'))));

// ---- tournament results
const good = () => ({ name: 'P', score: 3, correct: 3, total: 5, completedAt: serverTimestamp() });
const pDoc = (db, uid) => doc(db, `tournaments/T1/participants/${uid}`);
await t('player can submit own result once', assertSucceeds(setDoc(pDoc(as('p1'), 'p1'), good())));
await t('result cannot be overwritten (no replay / no "improving" the score)', assertFails(setDoc(pDoc(as('p1'), 'p1'), { ...good(), score: 5, correct: 5 })));
await t('result cannot be updated', assertFails(updateDoc(pDoc(as('p1'), 'p1'), { score: 5, correct: 5 })));
await t("cannot write another player's result", assertFails(setDoc(pDoc(as('p2'), 'p3'), good())));
await t('correct > total rejected', assertFails(setDoc(pDoc(as('p4'), 'p4'), { ...good(), correct: 6, score: 6 })));
await t('score != correct rejected', assertFails(setDoc(pDoc(as('p5'), 'p5'), { ...good(), score: 99 })));
await t('extra fields rejected', assertFails(setDoc(pDoc(as('p6'), 'p6'), { ...good(), bonus: 1 })));
await t('fake completedAt rejected', assertFails(setDoc(pDoc(as('p7'), 'p7'), { ...good(), completedAt: new Date(0) })));
await t('result for a non-existent tournament rejected', assertFails(setDoc(doc(as('p8'), 'tournaments/NOPE/participants/p8'), good())));
await t('anyone can read the leaderboard', assertSucceeds(getDoc(pDoc(env.unauthenticatedContext().firestore(), 'p1'))));
await t('only admin can delete a result', assertFails(deleteDoc(pDoc(as('p1'), 'p1'))));
await t('admin can delete a result', assertSucceeds(deleteDoc(pDoc(as('admin1'), 'p1'))));

console.log(`\n${pass} passed, ${fail} failed`);
await env.cleanup();
process.exit(fail ? 1 : 0);
