
# list commands
default:
    just --list

# build with drafts and serve locally
serve:
    hugo serve --buildDrafts --disableFastRender

# build release site and serve locally
serve-release:
    hugo --cleanDestinationDir serve

# new post, e.g. "just new 2025/my-title.md", or "just new 2025/my-title" for a folder
new title:
    hugo new content content/posts/{{title}}
