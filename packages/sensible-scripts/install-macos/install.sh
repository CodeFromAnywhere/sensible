
# this script contains 5 sections: 
# - install mac apps
# - install brave extensions
# - install vscode extensions
# - install developer tools
# - install github repo's




# - Install Apps (personal): Dropbox, Deluge, Spotify
# - Install Apps (for CFA): Brave, Slack, Sequel Ace, WhatsApp, Google Drive, RescueTime, OmniDiskSweeper
# - Install Apps (for clients): Microsoft Teams, Microsoft Outlook, VSCode, AWS VPN, NordLayer
# - Not needed apps: Xcode, Android Studio

# - Install Brave extensions: JSON Formatter, King

# Install VSCode extensions:
allExtensions=(
    "assisrMatheus.sidebar-markdown-notes"
    "bradlc.vscode-tailwindcss"
    "byCedric.vscode-expo"
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "formulahendry.auto-rename-tag"
    "GitHub.vscode-pull-request-github"
    "Grepper.grepper"
    "Gruntfuggly.todo-tree"
    "ms-vsliveshare.vsliveshare"
    "rvest.vs-code-prettier-eslint"
    "shd101wyy.markdown-preview-enhanced"
    "spmeesseman.vscode-taskexplorer"
    "team-sapling.sapling"
    "urbantrout.refactor-css"
    "WakaTime.vscode-wakatime"
    "yzane.markdown-pdf"
)

for t in ${allExtensions[@]}; do
  code --install-extension $t
done

# Install Developer tools: zshrc (and my zshrc file) Brew (and brew stuff I need) Node.js, NPM, yarn, Expo cli, Next.js



# GitHub Repo’s: Clone all active projects and install them locally
curl -u ${GITHUB_USERNAME}:${GITHUB_PERSONAL_ACCESS_TOKEN} https://api.github.com/orgs/Code-From-Anywhere/repos\?type\=all&sort=pushed&direction=desc&per_page=100
# todo:
# use https://www.baeldung.com/linux/jq-command-json to filter this to the unarchived repo's active in the last month
# then, git clone all of them into $DEVELOPER_HOME
# then, find all package.json's with dependencies or devdependencies in every repo, and install them (this can be done with papa)

