const beautifyCode = require('js-beautify').html

export const formatCode = (code: string) =>
  beautifyCode(code, {
    indent_size: '4',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'collapse',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: false,
    wrap_line_length: '70',
    indent_inner_html: false,
    comma_first: false,
    e4x: true,
    indent_empty_lines: false,
  })
