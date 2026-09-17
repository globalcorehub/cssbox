const {run}=require('./browser-helper.cjs'),assert=require('node:assert/strict'),fs=require('fs');const results=[];
const cases={
cssbox:['css-box-shadow-generator',async p=>{await p.locator('#shadow-x').fill('10');await p.locator('#shadow-y').fill('-5');await p.locator('#shadow-blur').fill('20');assert.match(await p.locator('#shadow-output').innerText(),/10px -5px 20px 0px rgba\(0, 0, 0, 0.25\)/);assert.match(await p.locator('#shadow-preview').evaluate(e=>e.style.boxShadow),/10px -5px 20px/);await p.locator('#shadow-blur').fill('-1');assert.equal(await p.locator('#shadow-output').innerText(),'');}],
};
(async()=>{for(const [site,[slug,test]] of Object.entries(cases)){await run(site,async(p,url,errors)=>{for(const lang of ['','zh/','de/','es/','fr/','ja/','pt/']){await p.goto(url+'/'+lang+slug);await test(p);results.push({site,lang,status:'passed'});}assert.deepEqual(errors,[]);});console.log(site,'passed');}})().catch(e=>{console.error(e);process.exitCode=1});
