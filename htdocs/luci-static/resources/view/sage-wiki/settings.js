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

		// Bug-15 修复：UCI 配置类型为 "sage-wiki"，section 名为 "main"。
		// TypedSection 按 *类型* 匹配，原代码错传 'main' 导致表单空白。
		// 改用 NamedSection(name, type) 同时约束名字与类型，且允许自定义字段。
		s = m.section(form.NamedSection, 'main', 'sage-wiki', _('Basic Settings'));
		s.addremove = false;
		s.addrs = true; // 允许在 NamedSection 中添加 options

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
		o.value('qwen', _('Qwen / DashScope (Alibaba Cloud)'));
		o.value('openai-compatible', _('OpenAI-compatible endpoint'));
		o.default = 'gemini';

		o = s.option(form.Value, 'model', _('Model name'), _(
			'Leave empty to use the provider default model.'
		));
		o.placeholder = 'gemini-2.5-flash';

		o = s.option(form.Value, 'api_key', _('API key'));
		o.password = true;
		o.rmempty = true;
		// Ollama 是本地模型，API key 不必填
		o.depends('provider', 'gemini');
		o.depends('provider', 'openai');
		o.depends('provider', 'anthropic');
		o.depends('provider', 'qwen');
		o.depends('provider', 'openai-compatible');

		o = s.option(form.Value, 'base_url', _('Custom base URL'), _(
			'Optional. Override the provider API endpoint, e.g. for OpenAI-compatible providers (OpenRouter, Azure), Ollama remote host, or custom proxy.'
		));
		o.placeholder = 'https://openrouter.ai/api/v1';
		o.rmempty = true;
		o.depends('provider', 'openai');
		o.depends('provider', 'openai-compatible');
		o.depends('provider', 'anthropic');
		o.depends('provider', 'gemini');
		o.depends('provider', 'ollama');
		o.depends('provider', 'qwen');

		o = s.option(form.Flag, 'webui', _('Enable Web UI'), _(
			'Only effective when the sage-wiki binary was compiled with CONFIG_SAGE_WIKI_WEBUI=y. ' +
			'If the binary was built CLI-only, the init script will log a warning and serve in MCP/stdio mode.'
		));
		o.rmempty = false;

		return m;
	}
});
