export interface BibEntry {
    key: string;
    type: string;
    fields: Record<string, string>;
}

function skipWhitespace(text: string, index: number) {
    let cursor = index;
    while (cursor < text.length && /\s|,/.test(text[cursor])) {
        cursor += 1;
    }
    return cursor;
}

function readBalancedValue(text: string, start: number) {
    const opener = text[start];
    const closer = opener === "{" ? "}" : "\"";
    let cursor = start + 1;
    let depth = opener === "{" ? 1 : 0;

    while (cursor < text.length) {
        const char = text[cursor];
        if (opener === "{" && char === "{") {
            depth += 1;
        } else if (opener === "{" && char === "}") {
            depth -= 1;
            if (depth === 0) {
                return {
                    value: text.slice(start + 1, cursor).trim(),
                    nextIndex: cursor + 1,
                };
            }
        } else if (opener === "\"" && char === closer) {
            return {
                value: text.slice(start + 1, cursor).trim(),
                nextIndex: cursor + 1,
            };
        }
        cursor += 1;
    }

    return {
        value: text.slice(start + 1).trim(),
        nextIndex: text.length,
    };
}

function parseFields(body: string) {
    const fields: Record<string, string> = {};
    let cursor = body.indexOf(",") + 1;

    while (cursor > 0 && cursor < body.length) {
        cursor = skipWhitespace(body, cursor);
        if (cursor >= body.length) {
            break;
        }

        const equalsIndex = body.indexOf("=", cursor);
        if (equalsIndex === -1) {
            break;
        }

        const key = body.slice(cursor, equalsIndex).trim().toLowerCase();
        cursor = skipWhitespace(body, equalsIndex + 1);
        if (cursor >= body.length) {
            break;
        }

        let value = "";
        if (body[cursor] === "{" || body[cursor] === "\"") {
            const parsed = readBalancedValue(body, cursor);
            value = parsed.value;
            cursor = parsed.nextIndex;
        } else {
            let end = cursor;
            while (end < body.length && body[end] !== ",") {
                end += 1;
            }
            value = body.slice(cursor, end).trim();
            cursor = end;
        }

        fields[key] = value.replace(/\s+/g, " ").trim();
        cursor += 1;
    }

    return fields;
}

export function parseBibTeX(raw: string) {
    const entries: BibEntry[] = [];
    let cursor = 0;

    while (cursor < raw.length) {
        const atIndex = raw.indexOf("@", cursor);
        if (atIndex === -1) {
            break;
        }

        const typeStart = atIndex + 1;
        const braceIndex = raw.indexOf("{", typeStart);
        if (braceIndex === -1) {
            break;
        }

        const type = raw.slice(typeStart, braceIndex).trim().toLowerCase();
        let depth = 1;
        let end = braceIndex + 1;
        while (end < raw.length && depth > 0) {
            if (raw[end] === "{") {
                depth += 1;
            } else if (raw[end] === "}") {
                depth -= 1;
            }
            end += 1;
        }

        const body = raw.slice(braceIndex + 1, end - 1).trim();
        const commaIndex = body.indexOf(",");
        const key = commaIndex === -1 ? body : body.slice(0, commaIndex).trim();
        entries.push({
            key,
            type,
            fields: parseFields(body),
        });

        cursor = end;
    }

    return entries;
}
