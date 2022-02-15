export const command = "hello <name>";
export const desc = "Greet <name> with Hello";
export const builder = (yargs) => yargs
    .options({
    upper: { type: "boolean" },
})
    .positional("name", { type: "string", demandOption: true });
export const handler = (argv) => {
    const { name, upper } = argv;
    const greeting = `Hi, ${name}!`;
    process.stdout.write(upper ? greeting.toUpperCase() : greeting);
    process.exit(0);
};
//# sourceMappingURL=example.js.map