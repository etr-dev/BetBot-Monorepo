import { getUserWalletId, getWallet, GetWalletResponse } from "@apis";
import { embedWaitMessage } from "@displayFormatting/pleaseWait.embed";
import { walletEmbed } from "@displayFormatting/wallet.embed";
import { logServer } from "@utils/log";
import { CreateUserRequest } from "src/apis/backendApi/requests";

export async function startWalletSaga(interaction) {
    let tempMsg = await interaction.reply({
        content: '',
        embeds: [embedWaitMessage()],
        ephemeral: true,
    });

    const createUserRequest = new CreateUserRequest(interaction);
    const walletRes = await getUserWalletId(createUserRequest);
    if (!walletRes) {
        interaction.reply('Error finding your wallet.');
    }
    const walletId = walletRes.walletId;
    const usersWallet: GetWalletResponse = await getWallet(walletId);
    
    const walletEmbedMsg = await interaction.editReply({
        content: 'WALLET',
        embeds: [walletEmbed(interaction.user, usersWallet)],
        ephemeral: true,
    });
}