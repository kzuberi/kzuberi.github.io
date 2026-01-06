# list commands
default:
    just --list --unsorted

# build with drafts and serve locally
serve:
    zola serve --drafts --interface 127.0.0.1 --port 1111

# build release site and serve locally
serve-release:
    zola serve --interface 127.0.0.1 --port 1111

# build site (includes drafts)
build:
    zola build --drafts

# build release site
build-release:
    zola build

# new post, e.g. "just new 2025/my-title" or "just new my-title"
new title:
    @mkdir -p "content/posts/$(dirname "{{title}}")"
    @printf '+++\ntitle = "%s"\ndate = %s\ndraft = true\n+++\n\n' "{{title}}" "$(date -Iseconds)" > "content/posts/{{title}}.md"
    @echo "Created content/posts/{{title}}.md"

# current date for header metadata
now:
    date -Iseconds