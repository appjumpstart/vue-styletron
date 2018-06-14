<template>
  <div>

    <section class="text-center p-2">
      <h1>
        <code>vue-styletron</code> demo
      </h1>
    </section>

    <section>
      <div contenteditable="true" :class="`${styles.editable} p-5`">
        Here is some text in a contenteditable div!
      </div>
    </section>

    <section>
      <form :class="styles.editor">
        <textarea id="styles" v-model="editableRules" />
      </form>
    </section>

    <section class="text-center p-5">
      <a href="https://github.com/appjumpstart">
        <img
          src="https://appjumpstart.nyc3.digitaloceanspaces.com/assets/appjumpstart-transparent.png"
          height="50">
      </a>
    </section>

  </div>
</template>

<script>
import CodeMirror from 'codemirror'

import 'codemirror/mode/javascript/javascript'

// Define editableRules as a string so that it can be displayed and editted in
// CodeMirror and then be evaluated into a JavaScript object and rendered as
// CSS styles by Styletron.
const editableRules = `{
  backgroundColor: '#dddfe6',
  textAlign: 'center',
  fontSize: '24px'
}`

// Create updateStyles to evaluate the rules string into a JavaScript object and
// initialize editable with the editableRules.
const updateStyles = rules => eval(`(function () { return ${rules} })()`)
const editable = updateStyles(editableRules)

export default {
  components: { CodeMirror },
  styles: { editable, editor: { height: 'auto' } },
  data: () => ({ editableRules }),
  mounted () {
    CodeMirror
      .fromTextArea(document.querySelector('#styles'), {
        mode: 'javascript',
        lineNumbers: true,
        indentUnit: 2,
        viewportMargin: Infinity,
        theme: 'dracula'
      })
      .on('change', ({ doc }) => {
        this.styles.editable = this.renderStyle(updateStyles(doc.getValue()))
      })
  }
}
</script>
