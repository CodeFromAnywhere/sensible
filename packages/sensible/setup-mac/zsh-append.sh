# CFA_ZSH_SECTION
# directory aliases
source ~/Developer/Code-From-Anywhere/cfa-workspace/aliases


# this is for installing https://github.com/zsh-users/zsh-autosuggestions
source ~/.zsh/zsh-autosuggestions/zsh-autosuggestions.zsh

# ship command
alias randomSuccess='arr=("you did it" "you rock" "you are the best" "you are amazing" "keep it going"); rand=$[$RANDOM % ${#arr[@]} + 1]; echo ${arr[$rand]}'
alias haschanges='[[ `git status --porcelain .` ]]'
alias mainbranch='BRANCH=$(git branch --show-current); [ "$BRANCH" = "main" ]'
pubmain () { mainbranch && haschanges && npm run pub --if-present } # nb: this will always publish if there are changes and it won't remove the changes
ship () { ALLARGS=$@; BRANCH=$(git branch --show-current); git add . && git commit -m "${ALLARGS:-Improvements}" && (pubmain; git push -u origin "$BRANCH") && say you shipped it, $(randomSuccess) || say something went wrong }

# pullpop command
alias pullpop='git stash && git pull && git stash pop'

# puball utilities
puball () { for f in $1/*; do ( cd $f; pubmain ); done; } # usage: "puball [directory]", e.g. "puball packages"
alias pubrwn='rwn && puball packages; ship'

dev () { for var in "$@"; do (cd ~/Developer/Code-From-Anywhere/cfa-workspace/workspaces/ && code "$var".code-workspace); done; }

ip () {
    local=$(ipconfig getifaddr en0) 
    remote=$(curl ifconfig.me)
    echo "Your local ip is $local and your remote ip is $remote"
    
    if [ $# -eq 0 ]
    then
        echo $local | pbcopy
    else 
        echo $remote | pbcopy
    fi
}

prod () { git log --stat --since "${2:-10 years ago}" --until "${3:-1 second ago}" --author="$1" --pretty=tformat: --numstat -- '*.yaml' -- '*.[tj]s' -- '*.[tj]sx' -- ':(exclude)*/build/*' -- ':(exclude)build/*' -- ':(exclude)*/node_modules/*' -- ':(exclude)node_modules/*' | awk '{ add += $1; subs += $2; loc += $1 - $2; productivity += $1 - 0.8 * $2; } END { printf "added lines: %s, removed lines: %s, total lines: %s, productive lines: %.0f \n", add, subs, loc, productivity }' }

authors () { git log --format="%an" | sort -u }

pros () {
    oldifs="$IFS"
    IFS=$'\n'
    authorsArray=( $(authors) )
    for a in $authorsArray; do ( echo $a && prod $a ); done;
    IFS="$oldifs"
}

. ~/.zsh/z.sh