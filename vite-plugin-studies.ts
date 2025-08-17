import { Plugin } from 'vite';
import { buildStudiesFromDirectory } from './scripts/study-builder';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function buildStudiesPlugin(): Plugin {
  const studiesDir = join(process.cwd(), 'studies');
  const outputFile = join(process.cwd(), 'src/data/generated-studies.json');
  
  function buildStudies() {
    try {
      console.log('🔄 Rebuilding studies...');
      const studies = buildStudiesFromDirectory({ studiesDir });
      writeFileSync(outputFile, JSON.stringify(studies, null, 2));
      console.log(`✅ Studies updated: ${studies.length} studies`);
    } catch (error) {
      console.error('❌ Failed to build studies:', error);
    }
  }

  return {
    name: 'build-studies',
    buildStart() {
      // Build studies when Vite starts
      buildStudies();
    },
    configureServer(server) {
      // Watch for changes to markdown files during development
      const watcher = server.watcher;
      
      watcher.add(join(studiesDir, '**/*.md'));
      
      watcher.on('change', (file) => {
        if (file.includes('/studies/') && file.endsWith('.md')) {
          console.log(`📝 Study file changed: ${file}`);
          buildStudies();
          
          // Trigger HMR for the studies module
          const module = server.moduleGraph.getModuleById(outputFile);
          if (module) {
            server.reloadModule(module);
          }
        }
      });
      
      watcher.on('add', (file) => {
        if (file.includes('/studies/') && file.endsWith('.md')) {
          console.log(`📝 New study file added: ${file}`);
          buildStudies();
        }
      });
    },
  };
}