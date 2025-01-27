const compiler = require('vue-template-compiler');
const {matchStringTpl, matchString} = require("./transform/transform");
const htmlparser = require('htmlparser2');


const template = `
  <div class="hello">
     <div class="error-msg">
      前&nbsp;面1
      {{
        errorMsg ? errorMsg : '错误1'
      }}
      中间123
      {{msg ? errorMsg
        ? errorMsg :
        '错{}误2' : '错}31{}1'}}
      后面
      {{msg === '重庆'?'重庆1':'重庆2'}}
    </div>
        {{msg === '重庆'?'重庆1':'重庆2'}}
        翻译1
    <div
      class="f2"
    >
        翻译2
    </div>
    <div class="f3" bddd>
        翻译3
        <div
        >
            翻译4
        </div>
        翻译5
    </div>
    翻译5-6
    <div class="abc"
    >
        翻译6
        <Test name="测试"/>
        翻译7
    </div>
    翻译8
    <Hello class="xxxx" />
    翻译9
    <br/>
    翻译10
    <div>
        翻译11
    </div>

  </div>
`


/**
 * 匹配查找标签内容（包含中文的内容）
 * @param {*} code
 */
const matchTagContent = ({code, options, ext, codeType, messages}) => {
    let index = 0;
    // code = code.replace(/(<([a-zA-Z0-9_-]+)[^>]*>)[^><]*([\s\S]*[\u4e00-\u9fa5]+[\s\S]*)(<\/\2>)/gm, (match, beforeSign, sign, value,afterSign) => {
    // code = code.replace(/(<[a-zA-Z0-9_-]+[^>]*>([^><]*[\u4e00-\u9fa5]+[^><]*)<\/[a-zA-Z0-9_-]+>)|(<\/[a-zA-Z0-9_-]+[^>]*>([^><]*[\u4e00-\u9fa5]+[^><]*)<[a-zA-Z0-9_-]+>)/gm,

    const beforeSign = '(<[a-zA-Z0-9_-]+[^>/]*>)';
    const value = '([^><]*[\\u4e00-\\u9fa5]+[^><]*)';
    const endSign = '(</[a-zA-Z0-9_-]+>)';
    const closeSign = '(<[a-zA-Z0-9_-]+[^>/]*/>)';


    const regList = [
        // <div></div>
        new RegExp(`${beforeSign}${value}${endSign}`, 'gm'),
        // </div><div>
        new RegExp(`${endSign}${value}${beforeSign}`, 'gm'),
        // <div><div>
        new RegExp(`${beforeSign}${value}${beforeSign}`, 'gm'),
        // </div></div>
        new RegExp(`${endSign}${value}${endSign}`, 'gm'),
        // <div><br/>
        new RegExp(`${beforeSign}${value}${closeSign}`, 'gm'),
        // <br/></div>
        new RegExp(`${closeSign}${value}${endSign}`, 'gm'),
        // </div><br/>
        new RegExp(`${endSign}${value}${closeSign}`, 'gm'),
        // <br/><div>
        new RegExp(`${closeSign}${value}${beforeSign}`, 'gm'),
        // <br/><br/>
        new RegExp(`${closeSign}${value}${closeSign}`, 'gm'),
    ]

    code = code.replace(regList[0], (math, beforeSign, value, afterSign) => {

        const outValues = value
            // \{\{((?:.|\r?\n)+?)\}\}
            .replace(/({{)((?:.|\r?\n)+?)(}})/gm, (m,p1,p2,p3)=>{
                return ',,';
            })
            .split(',,')
            .filter(item => item);
        outValues.forEach(item => {
            value = value.replace(item, value => {
                // 是否是中文
                if (/[\u4e00-\u9fa5]+/g.test(value)) {
                    value = `{{'${value.trim()}'}}`
                }
                return value
            })
        })
        return `${beforeSign}${value.trim()}${afterSign}`
    });
    return code
}

matchTagContent({code: template});
console.log(template);