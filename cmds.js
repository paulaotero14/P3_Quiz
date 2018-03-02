

const {log, biglog, errorlog, colorize} = require("./out");
const model = require('./model');

//porque el rl?
//rl esta definido en main, por lo que les paso como parametro el rl para que lo cojan de main
exports.helpCmd = rl => {
	log('COMANDOS:');
      	log('h|help - Muestra esta ayuda.');
		log('list - Listar los quizzes existentes.');
		log('show <id> - Muestra la pregunta y la respuesta el quiz indicado.');
		log('add - Añadir un nuevo quiz interactivamente.');
  		log('delete <id> - Borrar el quiz indicado.');
  		log('edit <id> - Editar el quiz indicado.');
  		log('test <id> - Probar el quiz indicado.');
  		log('p|play - Jugar a preguntar aleatoriamente todos los quizzes.');	
		log('credits - Créditos.');
		log('q|quit - Salir del programa.');  
		rl.prompt();
};


exports.quitCmd = rl => {
	rl.close();
	
};

//hazme la pregunta, cuando se escriba la pregunta y de a enter ya llama a lo demás para que escribas la respuesta
//prompt tiene que estar dentro, para haber terminado ya con todas las preguntas

exports.addCmd = rl => {

	rl.question(colorize(' Introduzca una pregunta: ', 'red'), question =>{

		rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer =>{

			model.add(question,answer);
			log(`${colorize('Se ha añadido', 'magenta')}: ${question} ${colorize('=>','magenta' )} ${answer}`);
			rl.prompt();
			});
		});
	};	


//${} sustituir lo que hay dentro por string o int
exports.listCmd = rl => {
	
	model.getAll().forEach((quiz, id) => {

		log(` [${colorize(id, 'magenta')}] : ${quiz.question } `);
	});

	rl.prompt();
};

exports.showCmd = (rl, id) => {
	
	if (typeof id === "undefined") {
		errorlog('Falta el parametro id. ');
	} else {
		try {
			const quiz = model.getByIndex(id);
			log(`[${colorize(id, 'magenta')}]: ${quiz.question} ${colorize('=>', 'magenta')} ${quiz.answer}`);
		} catch (error) {
			errorlog(error.message);
		}
	}

	rl.prompt();
};

exports.testCmd = (rl, id) => {
	
	if (typeof id === "undefined") {
		errorlog('Falta el parametro id. ');

	rl.prompt();

	} else {
		try {
				
			const quiz = model.getByIndex(id);

				rl.question(colorize(quiz.question, 'blue'), resp => {
					process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);

					if(resp === quiz.answer ) log (`[${colorize('CORRECTO', 'green')}]`);
					 	else log (`[${colorize('INCORRECTO', 'red')}]`);
					rl.prompt();
			})	;
		}

		catch (error) {
			errorlog(error.message);
		}
	}

	rl.prompt();

};

exports.playCmd = rl => {
	log('Jugar  ', 'red');
	rl.prompt();
	
};

exports.deleteCmd = (rl, id) => {

	if (typeof id === "undefined") {
		errorlog('Falta el parametro id. ');
	} else {
		try {
			model.deleteByIndex(id);
			
		} catch (error) {
			errorlog(error.message);
		}
	}

	rl.prompt();
};

exports.editCmd = (rl, id) => {
	if (typeof id === "undefined") {
		errorlog(`Falta el parametro id. `);
		rl.prompt();
	} else {
		try {

			const quiz = model.getByIndex(id);

			process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);

			rl.question(colorize(' Introduzca una pregunta: ', 'red'), question =>{

				process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);

				rl.question(colorize(' Introduzca la respuesta: ', 'red'), answer =>{

					model.update(id, question, answer);
					log(` Se ha cambiado el quiz ${colorize(id, 'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer}`);
					rl.prompt();
			});
		});
		
		} catch (error) {
			errorlog(error.message);
			rl.prompt();
		}
	}

	
};

exports.creditsCmd = rl => {
	log('Autor de la práctica: PAULA OTERO. ', 'green');
	rl.prompt();
};