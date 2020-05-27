// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const togglePresentation = vscode.commands.registerCommand('vscode-presentation.toggle', () => {
		let folderURI = getWorkspaceFolderUri();
		let ccc = vscode.Uri.file(folderURI.fsPath + "/settings.json");
		vscode.workspace.openTextDocument(ccc).then((text) => {
			const settings = JSON.parse(text.getText());
			const titles = settings.titles;
			const contents = settings.contents;

			titles.forEach((title) => {
				let wv = vscode.window.createWebviewPanel("title", title, vscode.ViewColumn.One);
				wv.webview.html = `<!DOCTYPE html><html><head></head><body><h1>${title}</h1></body></html>`;
			});

			contents.forEach((content) => {
				let filename = vscode.Uri.file(folderURI.fsPath + "/" + content);
				vscode.workspace.openTextDocument(filename).then((c) => {
					let fileContent = c.getText();
					let wv = vscode.window.createWebviewPanel("title", content + 'prev', vscode.ViewColumn.Two, { enableScripts: true });
					wv.webview.html = `<!DOCTYPE html><html><head></head><body>${fileContent}</body></html>`;
				}, (reason) => {
					console.log(reason);
				});

			});
		}, (reason) => {
			console.log(reason);
		});
	});

	const nextSlide = vscode.commands.registerCommand('vscode-presentation.nextSlide', () => {
		console.log("open 1");
		vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup").then(
			() => {
				console.log("next 1");
				vscode.commands.executeCommand("workbench.action.nextEditor").then(
					() => {
						console.log("open 2");
						vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup").then(
							() => {
								console.log("next 2");
								vscode.commands.executeCommand("workbench.action.nextEditor").then(
									() => {
										// console.log("open 3");
										// vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup").then(
										// 	() => {
										// 		console.log("next 3");
										// 		vscode.commands.executeCommand("workbench.action.nextEditor");
										// 	},
										// 	() => { }
										// );
									},
									() => { }
								);
							},
							() => { }
						);
					},
					() => { }
				);
			},
			() => { }
		);
	});

	const previousSlide = vscode.commands.registerCommand('vscode-presentation.previousSlide', () => {
		console.log("open 1");
		vscode.commands.executeCommand("workbench.action.focusFirstEditorGroup").then(
			() => {
				console.log("prev 1");
				vscode.commands.executeCommand("workbench.action.previousEditor").then(
					() => {
						console.log("open 2");
						vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup").then(
							() => {
								console.log("prev 2");
								vscode.commands.executeCommand("workbench.action.previousEditor").then(
									() => {
										// console.log("open 3");
										// vscode.commands.executeCommand("workbench.action.focusSecondEditorGroup").then(
										// 	() => {
										// 		console.log("prev 3");
										// 		vscode.commands.executeCommand("workbench.action.previousEditor");
										// 	},
										// 	() => { }
										// );
									},
									() => { }
								);
							},
							() => { }
						);
					},
					() => { }
				);
			},
			() => { }
		);
	})


	let disposable = vscode.commands.registerCommand('vscode-presentation.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from vscode-presentation!');
		//-----------------
		// let webview = vscode.window.createWebviewPanel("", "new webview", vscode.ViewColumn.One);
		// webview.title = "New webview na!";
		// webview.webview.html = `<!DOCTYPE html><html><head></head><body><h1> yaho</h1></body></html>`;

		// let doc = vscode.Uri.file('/Users/swarut/Projects/swarut/rusttest/t.txt');
		// let doc2 = vscode.Uri.file('/Users/swarut/Projects/swarut/rusttest/t2.txt');
		// vscode.window.showTextDocument(doc, vscode.ViewColumn.Two);
		// vscode.window.showTextDocument(doc2, vscode.ViewColumn.Three);
	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(togglePresentation);
	context.subscriptions.push(nextSlide);
	context.subscriptions.push(previousSlide);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

function getWorkspaceFolderUri() {
	let folders = vscode.workspace.workspaceFolders;
	if (!folders || folders.length < 1) {
		throw new Error(
			"There are no workspace folder. We can't retrieve VS Code settings."
		);
	}
	return folders[0].uri;
}

module.exports = {
	activate,
	deactivate
}
