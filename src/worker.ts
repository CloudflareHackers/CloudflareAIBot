import {
	Ai
} from "@cloudflare/ai";

export interface Env {
	AI: any;
	TG_BOT_TOKEN: string;
}

export default {
	async fetch(request: Request, env: Env) {
		const tg_bot_token = env.TG_BOT_TOKEN;
		const url = new URL(request.url);
		const path = url.pathname;
		const maxMessageLength = 4096;
		if (path == '/' && request.method === 'POST') {
			var data = JSON.stringify(await request.json());
			console.log(data)
			var obj = JSON.parse(data);
			try {
				if (obj.hasOwnProperty('message')) {
					if (obj.hasOwnProperty('message')) {
						if (obj.message.hasOwnProperty('text')) {
							if (obj.message.chat.type == "private") {
								let message = "The Bot works in this Group: https://t.me/%2BBSEojDWCtx1jOTFh"
								await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id=" + obj.message.chat.id + "&reply_to_message_id=" + obj.message.message_id + "&text=" + message, {
									method: "GET"
								});
							}
							const command = obj.message.text
							const replied_to_message_text = obj.message.reply_to_message?.text || ""
							let action = "typing"
							if (obj.message.message_thread_id && obj.message.message_thread_id == 334) {
								action = "upload_photo"
							}
							let model_name = "@cf/qwen/qwen1.5-14b-chat-awq"
							if (obj.message.message_thread_id && obj.message.message_thread_id == 339) {
								model_name = "@cf/microsoft/phi-2"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 765) {
								model_name = "@hf/thebloke/deepseek-coder-6.7b-base-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 786) {
								model_name = "@hf/thebloke/deepseek-coder-6.7b-instruct-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7845) {
								model_name = "@hf/google/gemma-7b-it"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7924) {
								model_name = "@cf/deepseek-ai/deepseek-math-7b-base"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7927) {
								model_name = "@cf/deepseek-ai/deepseek-math-7b-instruct"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7932) {
								model_name = "@cf/thebloke/discolm-german-7b-v1-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7938) {
								model_name = "@cf/tiiuae/falcon-7b-instruct"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7946) {
								model_name = "@hf/nousresearch/hermes-2-pro-mistral-7b"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7953) {
								model_name = "@hf/thebloke/llama-2-13b-chat-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7956) {
								model_name = "@hf/thebloke/llamaguard-7b-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7959) {
								model_name = "@hf/thebloke/mistral-7b-instruct-v0.1-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7962) {
								model_name = "@hf/mistralai/mistral-7b-instruct-v0.2"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7965) {
								model_name = "@hf/thebloke/neural-chat-7b-v3-1-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7968) {
								model_name = "@cf/openchat/openchat-3.5-0106"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7971) {
								model_name = "@hf/thebloke/openhermes-2.5-mistral-7b-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7974) {
								model_name = "@cf/microsoft/phi-2"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7978) {
								model_name = "@cf/qwen/qwen1.5-0.5b-chat"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7981) {
								model_name = "@cf/qwen/qwen1.5-1.8b-chat"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7984) {
								model_name = "@cf/qwen/qwen1.5-7b-chat-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7988) {
								model_name = "@cf/qwen/qwen1.5-14b-chat-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7991) {
								model_name = "@cf/defog/sqlcoder-7b-2"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7994) {
								model_name = "@hf/nexusflow/starling-lm-7b-beta"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7997) {
								model_name = "@cf/tinyllama/tinyllama-1.1b-chat-v1.0"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 8000) {
								model_name = "@hf/thebloke/zephyr-7b-beta-awq"
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 7600) {
								let model_number = 1
								await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, command, model_number)
								return new Response("OK", {
									status: 200,
									headers: {
										"content-type": "application/json",
									},
								})
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 334) {
								let model_number = 5
								await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, command, model_number)
								return new Response("OK", {
									status: 200,
									headers: {
										"content-type": "application/json",
									},
								})
							} else if (obj.message.message_thread_id && obj.message.message_thread_id == 6830 && !obj.message.photo) {
								await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id=" + obj.message.chat.id + "&reply_to_message_id=" + obj.message.message_id + "&text=Please send a photo along with a caption.", {
									method: "GET"
								});
								return new Response("OK", {
									status: 200,
									headers: {
										"content-type": "application/json",
									},
								})
							} else {
								let message = "This is a Basic Topic, You need to choose the topics from the chat to get the response from different AI Chat Models.\n\nOnly Image Models can send images.\n\nSource Code: https://github.com/CloudflareHackers/CloudflareAIBot"
								await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id=" + obj.message.chat.id + "&reply_to_message_id=" + obj.message.message_id + "&text=" + message, {
									method: "GET"
								});
								return new Response("OK", {
									status: 200,
									headers: {
										"content-type": "application/json",
									},
								})
							}



							await sendChatAction(obj.message.chat.id, action);
							const tasks = [];
							const ai = new Ai(env.AI);
							let chat = {
								messages: [{
										role: 'system',
										content: replied_to_message_text
									},
									{
										role: 'user',
										content: command
									}
								]
							};
							let response
							let conversation

							response = await ai.run(model_name, chat);
							tasks.push({
								inputs: chat,
								response,
							});
							conversation = response.response;
							const messages = [];
							let currentMessage = '';

							for (let i = 0; i < conversation.length; i += maxMessageLength) {
								const part = conversation.substr(i, maxMessageLength);
								messages.push(part);
							}
							// send typing action
							// Send each message
							for (const message of messages) {
								console.log("Sending " + message)
								await fetch(`https://api.telegram.org/bot${tg_bot_token}/sendMessage`, {
									method: 'POST',
									headers: {
										'Content-Type': 'application/json',
									},
									body: JSON.stringify({
										chat_id: obj.message.chat.id,
										reply_to_message_id: obj.message.message_id,
										text: message,
										disable_web_page_preview: true,
										reply_markup: {
											force_reply: true,
											selective: true,
											input_field_placeholder: "Keep Asking..."
										}
									}),
								});
							}
							return new Response(conversation, {
								status: 200,
								headers: {
									"content-type": "application/json",
								},
							})
						} else if (obj.message.message_thread_id) {
							if (obj.message.message_thread_id == 6830) {
								console.log("Message thread id is 6830")
								if (!obj.message.caption) {
									await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id=" + obj.message.chat.id + "&reply_to_message_id=" + obj.message.message_id + "&text=Please send a caption while sending the photo about what to do with the photo.", {
										method: "GET"
									});
									return new Response("OK", {
										status: 200,
										headers: {
											"content-type": "application/json",
										},
									})
								}
								let caption = obj.message.caption
								let model_number = 2
								let file_id = obj.message.photo[obj.message.photo.length - 1].file_id
								console.log(file_id)
								await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, file_id, model_number)
								return new Response("OK", {
									status: 200,
									headers: {
										"content-type": "application/json",
									},
								})
							}
						}
						/*return new Response(finalAnswer, {
						  headers: { 'Content-Type': 'text/plain' }, // Set the content type to plain text
						});*/
					}
				} else if (obj.hasOwnProperty('callback_query')) {
					// get the data text and generate photo and send as reply to it with model_number based on thread id
					const random = Math.floor(Math.random() * 1000000)
					const data = obj.callback_query.message.reply_to_message.text + " " + random
					const chat_id = obj.callback_query.message.chat.id
					const message_id = obj.callback_query.data
					let model_number = 1
					if (obj.callback_query.message.message_thread_id == 7600) {
						model_number = 1
					} else if (obj.callback_query.message.message_thread_id == 334) {
						model_number = 5
					}
					await handlePhotoEvent(chat_id, message_id, data, model_number)
					return new Response("OK", {
						status: 200,
						headers: {
							"content-type": "application/json",
						},
					})
				}
				return new Response("OK", {
					status: 200,
					headers: {
						"content-type": "application/json",
					},
				})
			} catch (error) {
				await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id=" + obj.message.chat.id + "&reply_to_message_id=" + obj.message.message_id + "&text=Something went wrong.\n\n" + error, {
					method: "GET"
				});
				return new Response("OK", {
					status: 200,
					headers: {
						"content-type": "application/json",
					},
				})
			}
		} else if (path == '/genImage2.png' && request.method === 'GET') {
			const searchParams = url.searchParams;
			const file_id = decodeURIComponent(searchParams.get('text') || '');
			const caption = decodeURIComponent(searchParams.get('caption') || 'turn into painting');
			const ai = new Ai(env.AI);
			// fetch image from telegram based on the file_id
			const image1 = await fetch(`https://api.telegram.org/bot${tg_bot_token}/getFile?file_id=${file_id}`);
			const image1_json = await image1.json();
			const file_path = image1_json.result.file_path;

			// Picture of a dog
			const exampleInputImage = await fetch(
				`https://api.telegram.org/file/bot${tg_bot_token}/${file_path}`
			);

			const inputs = {
				prompt: caption,
				image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],
			};

			const response = await ai.run(
				"@cf/runwayml/stable-diffusion-v1-5-img2img",
				inputs
			);

			return new Response(response, {
				headers: {
					"content-type": "image/png",
				},
			});
		} else if (path == '/genImage1.png' && request.method === 'GET') {
			const searchParams = url.searchParams;
			const raw_text = searchParams.get('text');
			const text = decodeURIComponent(raw_text || '');
			const ai = new Ai(env.AI);
			const inputs = {
				prompt: text,
			};

			const response = await ai.run(
				"@cf/lykon/dreamshaper-8-lcm",
				inputs
			);

			return new Response(response, {
				headers: {
					"content-type": "image/png",
				},
			});
		} else if (path == '/genImage4.png' && request.method === 'GET') {
			const searchParams = url.searchParams;
			const raw_text = searchParams.get('text');
			const text = decodeURIComponent(raw_text || '');
			const ai = new Ai(env.AI);
			const inputs = {
				prompt: text,
			};
			const response = await ai.run(
				"@cf/stabilityai/stable-diffusion-xl-base-1.0",
				inputs
			);
			return new Response(response, {
				headers: {
					"content-type": "image/png",
				},
			});
		} else if (path == '/genImage5.png' && request.method === 'GET') {
			const searchParams = url.searchParams;
			const raw_text = searchParams.get('text');
			const text = decodeURIComponent(raw_text || '');
			const ai = new Ai(env.AI);
			const inputs = {
				prompt: text,
			};
			const response = await ai.run(
				"@cf/bytedance/stable-diffusion-xl-lightning",
				inputs
			);
			return new Response(response, {
				headers: {
					"content-type": "image/png",
				},
			});
		} else {
			return new Response("OK", {
				status: 200,
				headers: {
					"content-type": "application/json",
				},
			});
		}

		async function sendChatAction(chat_id: string, action: string) {
			await fetch(`https://api.telegram.org/bot${tg_bot_token}/sendChatAction`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chat_id,
					action,
				}),
			});
		}

		async function handlePhotoEvent(chat_id, reply_to_message_id, command, model_number) {
			let reply_markup = {
				inline_keyboard: [
					[{
						text: "Generate More",
						callback_data: reply_to_message_id
					}]
				]
			}
			let json = {
				chat_id: chat_id,
				reply_to_message_id: reply_to_message_id,
				photo: `https://ai.hashhackersapi.workers.dev/genImage${model_number}.png?text=` + encodeURIComponent(command),
			}
			if (model_number == 1 || model_number == 5) {
				// push reply_markup to json as new
				json.reply_markup = reply_markup
				json.caption = command
			}
			const telegram_res = await fetch(`https://api.telegram.org/bot${tg_bot_token}/sendPhoto`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(json),
			});
			const telegram_res_json = await telegram_res.json();
			console.log(telegram_res_json)
			return new Response("OK", {
				status: 200,
				headers: {
					"content-type": "application/json",
				},
			});
		}
	}
}