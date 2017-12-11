let engine = new Engine(document);

engine.init();

document.getElementById('btn-restart').onclick = engine.restart.bind(engine);