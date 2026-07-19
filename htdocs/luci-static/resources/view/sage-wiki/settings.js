'use strict';
'require form';
'require fs';
'require uci';
'require view';

return view.extend({
    load: function() {
        return uci.load('sage-wiki');
    },

    render: function() {
        var m, s, o;

        m = new form.Map('sage-wiki', _('sage-wiki'), _(
            'LLM-compiled personal knowledge base that compiles documents into a structured wiki.'
        ));

        this.map = m;

        s = m.section(form.TypedSection, 'main', _('Basic Settings'));
        s.anonymous = true;
        s.addremove = false;

        o = s.option(form.Flag, 'enabled', _('Enable service'), _(
            'Run sage-wiki as a daemon process.'
        ));
        o.rmempty = false;

        o = s.option(form.Value, 'port', _('Listen port'));
        o.datatype = 'port';
        o.placeholder = '3333';
        o.rmempty = false;

        o = s.option(form.ListValue, 'provider', _('LLM provider'));
        o.value('gemini', _('Google Gemini'));
        o.value('openai', _('OpenAI'));
        o.value('anthropic', _('Anthropic Claude'));
        o.value('ollama', _('Ollama (local)'));
        o.value('openai-compatible', _('OpenAI-compatible endpoint'));
        o.default = 'gemini';

        o = s.option(form.Value, 'model', _('Model name'), _(
            'Leave empty to use the provider default model.'
        ));
        o.placeholder = 'gemini-2.5-flash';

        o = s.option(form.Value, 'api_key', _('API key'));
        o.password = true;
        o.rmempty = true;

        o = s.option(form.Flag, 'webui', _('Enable Web UI'), _(
            'Only effective when the binary was compiled with the webui build tag.'
        ));
        o.rmempty = false;

        return m;
    }
});