const { withProjectBuildGradle } = require('@expo/config-plugins');

module.exports = (config) => {
  return withProjectBuildGradle(config, (cfg) => {
    const { modResults } = cfg;
    if (modResults.language !== 'groovy') {
      throw new Error('withJitPack: Cannot add JitPack maven repository because the build.gradle is not groovy');
    }

    let content = modResults.contents;
    const jitpackString = "maven { url 'https://www.jitpack.io' }";
    // Using a common indent, adjust if your generated gradle has a different one
    const jitpackLineWithIndent = `        ${jitpackString}`;

    // Function to safely add JitPack to a repositories block
    const addJitpackToRepositoriesBlock = (blockOpenRegexString, blockCloseChar = '}')  => {
      // Regex to find the opening of the block, e.g., "allprojects { repositories {"
      const blockOpenRegex = new RegExp(blockOpenRegexString, 'm');
      const match = content.match(blockOpenRegex);

      if (match && match[0]) {
        // Check if JitPack is already within this specific matched block to avoid duplicates
        // We need to find the end of this specific repositories block to check inside it
        let blockStartIndex = match.index + match[0].length;
        let openBraces = 1;
        let blockEndIndex = -1;
        for (let i = blockStartIndex; i < content.length; i++) {
          if (content[i] === '{') openBraces++;
          if (content[i] === blockCloseChar) openBraces--;
          if (openBraces === 0) {
            blockEndIndex = i;
            break;
          }
        }

        if (blockEndIndex !== -1) {
          const specificBlockContent = content.substring(blockStartIndex, blockEndIndex);
          if (specificBlockContent.includes(jitpackString)) {
            return; // JitPack already present in this block
          }
        }

        // Add JitPack on a new line, right after the opening brace of repositories
        content = content.replace(blockOpenRegex, `${match[0]}\n${jitpackLineWithIndent}`);
      } else {
        console.warn(`withJitPack: Pattern "${blockOpenRegexString}" not found. JitPack may not be added correctly to this section.`);
      }
    };

    // Target 'allprojects { repositories {' (flexible with whitespace)
    addJitpackToRepositoriesBlock('(allprojects\\s*\\{[\s\S]*?repositories\\s*\\{)');

    // Target 'buildscript { repositories {' (flexible with whitespace)
    addJitpackToRepositoriesBlock('(buildscript\\s*\\{[\s\S]*?repositories\\s*\\{)');

    // Fallback: If JitPack is still not added and the above precise patterns failed,
    // try a more general addition if 'allprojects { ... }' exists but 'repositories' was missing inside.
    if (!content.includes(jitpackString)) {
        const allProjectsBlockRegex = /allprojects\s*\{/m;
        const allProjectsWithReposRegex = /allprojects\s*\{[\s\S]*?repositories\s*\{/m;

        if (allProjectsBlockRegex.test(content) && !allProjectsWithReposRegex.test(content)) {
            // allprojects block exists, but no repositories block inside it. Add one.
            content = content.replace(allProjectsBlockRegex, `$&
    repositories {
${jitpackLineWithIndent}
    }
`);
        } else if (!allProjectsBlockRegex.test(content)) {
            // allprojects block itself doesn't exist. Add it (less likely for modern Expo).
            content += `\n\nallprojects {
    repositories {
${jitpackLineWithIndent}
    }
}
`;
            console.warn("withJitPack: Added 'allprojects' block with JitPack because it was missing.");
        }
    }

    modResults.contents = content;
    return cfg;
  });
};
