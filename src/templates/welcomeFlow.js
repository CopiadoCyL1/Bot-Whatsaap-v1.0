import { addKeyword, EVENTS } from '@builderbot/bot';
import { chat } from '../services/chatgpt.js';

const welcomeFlow = addKeyword(EVENTS.WELCOME)
    .addAction(async (ctx, ctxFn) => {
        const state = await ctxFn.state.getMyState();
        const thread = state?.thread ?? null;
        const response = await chat(ctx.body, ctx.name, thread);
        await ctxFn.state.update({ thread: response.thread });

        // Mensaje indicando que es un bot
        const botNotice = "Nota: Soy un bot DisArt.Y.S y estoy aquí para ayudarte.";

        // Combinar el aviso del bot con la respuesta del chat
        const fullResponse = `${response.response}\n\n${botNotice}`;

        return ctxFn.endFlow(fullResponse); // Usar fullResponse aquí
    });

export { welcomeFlow };