import chalk from 'chalk';

export default defineEventHandler((event) => {
	console.log(chalk.green('[OK] '), chalk.blue('New'), chalk.green.bold(getMethod(event)), chalk.blue('request: '), chalk.yellow(event.node.req.url));
});
