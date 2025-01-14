const chai = require('chai');
const expect = chai.expect;
let {
  openBrowser,
  goto,
  textBox,
  closeBrowser,
  write,
  into,
  setConfig,
  above,
} = require('../../lib/taiko');
let {
  createHtml,
  removeFile,
  openBrowserArgs,
} = require('./test-util');
const test_name = 'textBox';

describe(test_name, () => {
  before(async () => {
    await openBrowser(openBrowserArgs);
  });

  after(async () => {
    await closeBrowser();
  });

  describe('textarea', () => {
    let filePath;
    before(async () => {
      let innerHtml =
        '<div>' +
        //Textarea
        '<form name="textArea">' +
        '<div name="textAreaWithWrappedLabel">' +
        '<label>' +
        '<span>textAreaWithWrappedLabel</span>' +
        '<textarea></textarea>' +
        '</label>' +
        '</div>' +
        '<div name="textAreaWithLabelFor">' +
        '<label for="textAreaWithLabelFor">textAreaWithLabelFor</label>' +
        '<textarea id="textAreaWithLabelFor"></textarea>' +
        '</div>' +
        '</form>' +
        '</div>';
      filePath = createHtml(innerHtml, test_name);
      await goto(filePath);
      setConfig({ waitForNavigation: false });
    });

    after(() => {
      setConfig({ waitForNavigation: true });
      removeFile(filePath);
    });

    describe('wrapped in label', () => {
      it('test exists()', async () => {
        expect(await textBox('textAreaWithWrappedLabel').exists()).to
          .be.true;
      });

      it('test value()', async () => {
        await write(
          'textAreaWithWrappedLabel',
          into(textBox('textAreaWithWrappedLabel')),
        );
        expect(
          await textBox('textAreaWithWrappedLabel').value(),
        ).to.equal('textAreaWithWrappedLabel');
      });
    });

    describe('using label for', () => {
      it('test exists()', async () => {
        expect(await textBox('textAreaWithLabelFor').exists()).to.be
          .true;
      });

      it('test value()', async () => {
        await write(
          'textAreaWithLabelFor',
          into(textBox('textAreaWithLabelFor')),
        );
        expect(
          await textBox('textAreaWithLabelFor').value(),
        ).to.equal('textAreaWithLabelFor');
      });
    });

    describe('attribute and value pair', () => {
      it('test exists()', async () => {
        expect(await textBox({ id: 'textAreaWithLabelFor' }).exists())
          .to.be.true;
      });

      it('test value()', async () => {
        expect(
          await textBox({ id: 'textAreaWithLabelFor' }).value(),
        ).to.equal('textAreaWithLabelFor');
      });
    });

    describe('with relative selector', () => {
      it('test exists()', async () => {
        expect(await textBox(above('textAreaWithLabelFor')).exists())
          .to.be.true;
      });

      it('test value()', async () => {
        expect(
          await textBox(above('textAreaWithLabelFor')).value(),
        ).to.equal('textAreaWithWrappedLabel');
      });
    });
  });

  describe('contentEditable', () => {
    let filePath;
    before(async () => {
      let innerHtml =
        '<div>' +
        //contentEditable div
        '<form name="contentEditable">' +
        '<div name="contentEditableWithWrappedLabel">' +
        '<label>' +
        '<span>contentEditableWithWrappedLabel</span>' +
        '<div id="contentEditableWithWrappedLabel" contenteditable=true></div>' +
        '</label>' +
        '</div>' +
        '<div name="contentEditableWithLabelFor">' +
        '<label for="contentEditableWithLabelFor">contentEditableWithLabelFor</label>' +
        '<div id="contentEditableWithLabelFor" contenteditable=true></div>' +
        '</div>' +
        '</form>' +
        '</div>';
      filePath = createHtml(innerHtml, test_name);
      await goto(filePath);
      setConfig({ waitForNavigation: false });
    });

    after(() => {
      setConfig({ waitForNavigation: true });
      removeFile(filePath);
    });

    describe('wrapped in label', () => {
      it('test exists()', async () => {
        expect(
          await textBox('contentEditableWithWrappedLabel').exists(),
        ).to.be.true;
      });

      it('test value()', async () => {
        await write(
          'contentEditableWithWrappedLabel',
          into(textBox('contentEditableWithWrappedLabel')),
        );
        expect(
          await textBox('contentEditableWithWrappedLabel').value(),
        ).to.equal('contentEditableWithWrappedLabel');
      });
    });

    describe('using label for', () => {
      it('test exists()', async () => {
        expect(await textBox('contentEditableWithLabelFor').exists())
          .to.be.true;
      });

      it('test value()', async () => {
        await write(
          'contentEditableWithLabelFor',
          into(textBox('contentEditableWithLabelFor')),
        );
        expect(
          await textBox('contentEditableWithLabelFor').value(),
        ).to.equal('contentEditableWithLabelFor');
      });
    });

    describe('attribute and value pair', () => {
      it('test exists()', async () => {
        expect(
          await textBox({
            id: 'contentEditableWithWrappedLabel',
          }).exists(),
        ).to.be.true;
      });

      it('test value()', async () => {
        expect(
          await textBox({
            id: 'contentEditableWithWrappedLabel',
          }).value(),
        ).to.equal('contentEditableWithWrappedLabel');
      });
    });

    describe('with relative selector', () => {
      it('test exists()', async () => {
        expect(
          await textBox(
            above('contentEditableWithLabelFor'),
          ).exists(),
        ).to.be.true;
      });

      it('test value()', async () => {
        expect(
          await textBox(above('contentEditableWithLabelFor')).value(),
        ).to.equal('contentEditableWithWrappedLabel');
      });
    });
  });

  var inputTypes = [
    {
      type: 'text',
      name: 'inputType-text',
      testValue: 'text input type entered',
    },
    {
      type: 'password',
      name: 'inputType-password',
      testValue: 'password input type entered',
    },
    {
      type: 'search',
      name: 'inputType-search',
      testValue: 'search input type entered',
    },
    { type: 'number', name: 'inputType-number', testValue: '10' },
    {
      type: 'email',
      name: 'inputType-email',
      testValue: 'email@test.com',
    },
    {
      type: 'tel',
      name: 'inputType-tel',
      testValue: '01-111-111-111',
    },
    {
      type: 'url',
      name: 'inputType-url',
      testValue: 'https://test.com',
    },
  ];
  inputTypes.forEach(inputType => {
    describe('input with type ' + inputType.type, () => {
      let filePath;
      before(async () => {
        let innerHtml = `
                <div>
                    <form name="${inputType.name}">
                        <div name="withInlineText">
                            <input type="${inputType.type}">With Inline Text</input>
                        </div>
                        <div name="withWrappedLabel">
                            <label>
                                <input type="${inputType.type}"/>
                                <span>With Wrapped Label</span>
                            </label>
                        </div>
                        <div name="withLabelFor">
                            <label for="${inputType.name}WithLabelFor">With Label For</label>
                            <input id="${inputType.name}WithLabelFor" type="${inputType.type}"/>
                        </div>
                    </form>
                </div>`;
        filePath = createHtml(innerHtml, test_name + inputType.type);
        await goto(filePath);
        setConfig({ waitForNavigation: false });
      });

      after(() => {
        setConfig({ waitForNavigation: true });
        removeFile(filePath);
      });

      describe('with inline text', () => {
        it('test exists()', async () => {
          expect(await textBox('With Inline Text').exists()).to.be
            .true;
        });

        it('test value()', async () => {
          await write(
            inputType.testValue,
            into(textBox('With Inline Text')),
          );
          expect(await textBox('With Inline Text').value()).to.equal(
            inputType.testValue,
          );
        });
      });

      describe('wrapped in label', () => {
        it('test exists()', async () => {
          expect(await textBox('With Wrapped Label').exists()).to.be
            .true;
        });

        it('test value()', async () => {
          await write(
            inputType.testValue,
            into(textBox('With Wrapped Label')),
          );
          expect(
            await textBox('With Wrapped Label').value(),
          ).to.equal(inputType.testValue);
        });
      });

      describe('using label for', () => {
        it('test exists()', async () => {
          expect(await textBox('With Label For').exists()).to.be.true;
        });

        it('test value()', async () => {
          await write(
            inputType.testValue,
            into(textBox('With Label For')),
          );
          expect(await textBox('With Label For').value()).to.equal(
            inputType.testValue,
          );
        });
      });

      describe('attribute and value pair', () => {
        it('test exists()', async () => {
          expect(
            await textBox({
              id: inputType.name + 'WithLabelFor',
            }).exists(),
          ).to.be.true;
        });

        it('test value()', async () => {
          expect(
            await textBox({
              id: inputType.name + 'WithLabelFor',
            }).value(),
          ).to.equal(inputType.testValue);
        });
      });

      describe('with relative selector', () => {
        it('test exists()', async () => {
          expect(await textBox(above('With Label For')).exists()).to
            .be.true;
        });

        it('test value()', async () => {
          expect(
            await textBox(above('With Label For')).value(),
          ).to.equal(inputType.testValue);
        });
      });
    });
  });

  describe('input without type ', () => {
    let filePath;
    const inputTypeName = 'input-without-type';
    const inputValue = 'text input type entered';
    before(async () => {
      let innerHtml = `
            <div>
                <form name="${inputTypeName}">
                    <div name="withInlineText">
                        <input >With Inline Text</input>
                    </div>
                    <div name="withWrappedLabel">
                        <label>
                            <input />
                            <span>With Wrapped Label</span>
                        </label>
                    </div>
                    <div name="withLabelFor">
                        <label for="${inputTypeName}WithLabelFor">With Label For</label>
                        <input id="${inputTypeName}WithLabelFor"/>
                    </div>
                </form>
            </div>`;
      filePath = createHtml(innerHtml, test_name + inputTypeName);
      await goto(filePath);
      setConfig({ waitForNavigation: false });
    });

    after(() => {
      setConfig({ waitForNavigation: true });
      removeFile(filePath);
    });

    describe('with inline text', () => {
      it('test exists()', async () => {
        expect(await textBox('With Inline Text').exists()).to.be.true;
      });

      it('test value()', async () => {
        await write(inputValue, into(textBox('With Inline Text')));
        expect(await textBox('With Inline Text').value()).to.equal(
          inputValue,
        );
      });
    });

    describe('wrapped in label', () => {
      it('test exists()', async () => {
        expect(await textBox('With Wrapped Label').exists()).to.be
          .true;
      });

      it('test value()', async () => {
        await write(inputValue, into(textBox('With Wrapped Label')));
        expect(await textBox('With Wrapped Label').value()).to.equal(
          inputValue,
        );
      });
    });

    describe('using label for', () => {
      it('test exists()', async () => {
        expect(await textBox('With Label For').exists()).to.be.true;
      });

      it('test value()', async () => {
        await write(inputValue, into(textBox('With Label For')));
        expect(await textBox('With Label For').value()).to.equal(
          inputValue,
        );
      });
    });

    describe('attribute and value pair', () => {
      it('test exists()', async () => {
        expect(
          await textBox({
            id: inputTypeName + 'WithLabelFor',
          }).exists(),
        ).to.be.true;
      });

      it('test value()', async () => {
        expect(
          await textBox({
            id: inputTypeName + 'WithLabelFor',
          }).value(),
        ).to.equal(inputValue);
      });
    });

    describe('with relative selector', () => {
      it('test exists()', async () => {
        expect(await textBox(above('With Label For')).exists()).to.be
          .true;
      });

      it('test value()', async () => {
        expect(
          await textBox(above('With Label For')).value(),
        ).to.equal(inputValue);
      });
    });
  });
});
