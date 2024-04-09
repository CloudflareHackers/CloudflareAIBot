import { Ai } from "@cloudflare/ai";

export interface Env {
  AI: any;
  TG_BOT_TOKEN: string; 
}

export default {
  async fetch(request: Request, env: Env) {
    const tg_bot_token = env.TG_BOT_TOKEN;
    console.log(tg_bot_token)
    const url = new URL(request.url);
    const path = url.pathname;
    const maxMessageLength = 4096;
    if (path == '/' && request.method === 'POST') {
        var data = JSON.stringify(await request.json());
        console.log(data)
        var obj = JSON.parse(data);
        try {
          if (obj.hasOwnProperty('message')) {
            if (obj.message.hasOwnProperty('text')) {
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
              }
              await sendChatAction(obj.message.chat.id, action);
              
              const tasks = [];
              const ai = new Ai(env.AI);
              let chat = {
                messages: [
                  { role: 'system', content: replied_to_message_text },
                  { role: 'user', content: command }
                ]
              };
              let response
              let conversation
              if (command.startsWith("/")) {
                await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id="+obj.message.chat.id+"&reply_to_message_id="+obj.message.message_id+"&text=Made basically for https://t.me/%2BBSEojDWCtx1jOTFh", {
                  method: "GET"
                });
                return new Response("OK", {
                  status: 200,
                  headers: {
                      "content-type": "application/json",
                  },
                })
              } else if (obj.message.message_thread_id) {
                if (obj.message.message_thread_id == 6830) {
                    if (!obj.message.photo) {
                        await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id="+obj.message.chat.id+"&reply_to_message_id="+obj.message.message_id+"&text=Please send a photo", {
                            method: "GET"
                        });
                        return new Response("OK", {
                            status: 200,
                            headers: {
                                "content-type": "application/json",
                            },
                        })
                    }
                    let model_number = 3
                    let file_id = obj.message.photo[obj.message.photo.length - 1].file_id
                    await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, file_id, model_number)
                    return new Response("OK", {
                        status: 200,
                        headers: {
                            "content-type": "application/json",
                        },
                    })
                }
                if (obj.message.message_thread_id == 6807) {
                    let model_number = 4
                    await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, command, model_number)
                    return new Response("OK", {
                        status: 200,
                        headers: {
                            "content-type": "application/json",
                        },
                    })
                }
                if (obj.message.message_thread_id == 334) {
                    let model_number = 5
                    await handlePhotoEvent(obj.message.chat.id, obj.message.message_id, command, model_number)
                    return new Response("OK", {
                      status: 200,
                      headers: {
                          "content-type": "application/json",
                      },
                    })
                }
              }
              response = await ai.run(model_name, chat);
              tasks.push({ inputs: chat, response });
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
                console.log("Sending "+ message)
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
              /*return new Response(finalAnswer, {
                headers: { 'Content-Type': 'text/plain' }, // Set the content type to plain text
              });*/  
            }
          }
          return new Response("OK", {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
          })
        } catch (error) {
          await fetch("https://api.telegram.org/bot" + tg_bot_token + "/SendMessage?disable_web_page_preview=true&chat_id="+obj.message.chat.id+"&reply_to_message_id="+obj.message.message_id+"&text=Something went wrong.\n\n"+error, {
            method: "GET"
          });
          return new Response("OK", {
            status: 200,
            headers: {
                "content-type": "application/json",
            },
          })
        }
    } else if (path == '/genImage3.png' && request.method === 'GET') {
        const searchParams = url.searchParams;
        const raw_text = searchParams.get('text');
        const file_id = decodeURIComponent(raw_text || '');
        const ai = new Ai(env.AI);
        // fetch image from telegram based on the file_id
        const image1 = await fetch(`https://api.telegram.org/bot${tg_bot_token}/getFile?file_id=${file_id}`);
        const image1_json = await image1.json();
        const file_path = image1_json.result.file_path;

        // Picture of a dog
        const exampleInputImage = await fetch(
          `https://api.telegram.org/file/bot${tg_bot_token}/${file_path}`
        );
    
        // Mask of dog
        const exampleMask = await fetch(
          "https://pub-1fb693cb11cc46b2b2f656f51e015a2c.r2.dev/dog-mask.png"
        );
    
        const inputs = {
          prompt: "Change to a lion",
          image: [...new Uint8Array(await exampleInputImage.arrayBuffer())],
          //mask: [...new Uint8Array(await exampleMask.arrayBuffer())],
        };
    
        const response =
          await ai.run(
            "@cf/runwayml/stable-diffusion-v1-5-inpainting",
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

    async function handlePhotoEvent(chat_id : string, reply_to_message_id, command : string, model_number) {
        const telegram_res = await fetch(`https://api.telegram.org/bot${tg_bot_token}/sendPhoto`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: chat_id,
              reply_to_message_id: reply_to_message_id,
              photo: `https://ai.hashhackersapi.workers.dev/genImage${model_number}.png?text=`+encodeURIComponent(command),
            }),
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