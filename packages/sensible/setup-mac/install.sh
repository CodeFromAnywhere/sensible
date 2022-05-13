#!/usr/bin/env bash

echo "🌞 Welcome to the Sensible setup script 1.0.6"

# install command line tools
if [[ ! "$(xcode-select -p)" ]]; then
    echo "🚀 Installing XCode CLI"
    xcode-select --install
else
    echo "🚀 XCode CLI already installed"
fi

# maybe doesn't exist
touch ~/.bashrc


# install brew
if [[ ! "$(type brew)" ]]; then
    echo "🌶 Installing homebrew"
    # /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

    # add brew to zsh
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"

else
    echo "🌶 Homebrew already installed"
fi


echo "🌟 Updating brew"
brew update

echo "🖥 Installing git"
# install latest version of git
brew install git
brew upgrade git

# install vscode 
if [[ ! "$(type code)" ]]; then
    echo "🖥 Installing VSCode"
    brew install --cask visual-studio-code
    echo "🖥 Enabling code-command"
    sudo ln -s  /Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code /usr/local/bin/code
    source ~/.bashrc
else
    echo "🖥 VSCode already installed"
fi

echo "🤓 Installing VSCode extensions"
# install all extensions
alreadyExtensions=($(code --list-extensions))

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
    "yzhang.markdown-all-in-one"
    "hnw.vscode-auto-open-markdown-preview"
    "code-from-anywhere.sensible"
)

for t in ${allExtensions[@]}; do
    if [[ ! " ${alreadyExtensions[*]} " =~ " ${t} " ]]; then
        code --install-extension $t
    else
        echo "We already have the $t VSCode extension"
    fi
done

echo "🌙 Installing nightfall"
brew install --cask nightfall

echo "⚰️ Installing cask"
brew tap "homebrew/cask"

echo "🌎 Installing Google Chrome"
brew install --cask "google-chrome"

echo "🦊 Installing Firefox"
brew install --cask "firefox"

echo "🎵 Installing Spotify"
brew install --cask "spotify"

if [[ ! "$(type mas)" ]]; then
    echo "🖥 Installing mas CLI"
    brew install mas
    source ~/.bashrc
else
    echo "🖥 mas already installed"
fi

echo "💬 Installing slack"
mas install 803453959

echo "💿 Installing Sequel Ace"
mas install 1518036000

echo "🐸 Installing node"
brew install node

echo "🧐 Installing watchman"
brew install watchman

echo "🧶 Installing yarn"
brew install yarn

echo "🥸 Installing pnpm"
brew install pnpm

# install brew
if [[ ! "$(type expo)" ]]; then
    echo "🎪 Installing expo"
    npm install --global expo-cli
else
    echo "🎪 Expo already installed"
fi

# echo "Cloning most important repo's"
# cd ~
# mkdir Developer
# cd Developer

# declare -a REPOS=(
#     "Code-From-Anywhere/react-with-native"
#     "Code-From-Anywhere/sensible"
#     "Code-From-Anywhere/king"
#     "Code-From-Anywhere/CoworkSurf"
#     "Code-From-Anywhere/cfa"
#     "Code-From-Anywhere/plugable"
#     "Code-From-Anywhere/cfa-workspace"
#     "Code-From-Anywhere/loyal"
#     "Karsens/karsens"
#     "EmesaDEV/avdd-frontend"
#     "stoic-strategies/frontend"
# )

# ## now loop through the above array
# for i in "${REPOS[@]}"
# do
#    [ ! -d $i ] && git clone https://github.com/$i.git $i && echo "cloned $i" || echo "$i already exists";
# done


# ZSH
echo "🦄 Installing oh my zsh"
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
echo "🦄 Installing zsh autosuggestions"
curl https://raw.githubusercontent.com/rupa/z/master/z.sh > ~/.zsh/z.sh
# NB: this should be in zsh-append: . ~/.zsh/z.sh
git clone https://github.com/zsh-users/zsh-autosuggestions ~/.zsh/zsh-autosuggestions
# NB: this should be in zsh-append: source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

if grep --quiet CFA_ZSH_SECTION ~/.zshrc; then
    echo "🦄 zshrc CFA section already there"
else
    echo "🦄 Adding CFA section to your ~/.zshrc"
    curl -H 'Cache-Control: no-cache' https://raw.githubusercontent.com/Code-From-Anywhere/sensible/main/packages/sensible/setup-mac/zsh-append.sh >> ~/.zshrc
fi


#TODO: also install code-cli!!!

# say "Done. Happy coding!"
echo "🦄 Done. Happy coding!"

