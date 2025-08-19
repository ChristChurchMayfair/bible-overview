import { Plugin } from 'vite';
import { buildStudiesFromDirectory } from './scripts/study-builder';
import { parseScheduleCsv } from './src/utils/schedule';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function buildStudiesPlugin(): Plugin {
  const studiesDir = join(process.cwd(), 'studies');
  const studiesOutputFile = join(process.cwd(), 'src/data/generated-studies.json');
  const scheduleInputFile = join(studiesDir, 'schedule.csv');
  const scheduleOutputFile = join(process.cwd(), 'src/data/generated-schedule.json');
  
  function buildStudies() {
    try {
      console.log('🔄 Rebuilding studies...');
      const studies = buildStudiesFromDirectory({ studiesDir });
      writeFileSync(studiesOutputFile, JSON.stringify(studies, null, 2));
      console.log(`✅ Studies updated: ${studies.length} studies`);
    } catch (error) {
      console.error('❌ Failed to build studies:', error);
    }
  }

  function buildSchedule() {
    try {
      console.log('📅 Rebuilding schedule...');
      const csvContent = readFileSync(scheduleInputFile, 'utf-8');
      const schedule = parseScheduleCsv(csvContent);
      writeFileSync(scheduleOutputFile, JSON.stringify(schedule, null, 2));
      console.log(`✅ Schedule updated: ${schedule.length} weeks`);
    } catch (error) {
      console.error('❌ Failed to build schedule:', error);
    }
  }

  return {
    name: 'build-studies',
    buildStart() {
      // Build studies and schedule when Vite starts
      buildStudies();
      buildSchedule();
    },
    configureServer(server) {
      // Watch for changes to markdown files and schedule CSV during development
      const watcher = server.watcher;
      
      watcher.add(join(studiesDir, '**/*.md'));
      watcher.add(scheduleInputFile);
      
      watcher.on('change', (file) => {
        if (file.includes('/studies/') && file.endsWith('.md')) {
          console.log(`📝 Study file changed: ${file}`);
          buildStudies();
          
          // Trigger HMR for the studies module
          const module = server.moduleGraph.getModuleById(studiesOutputFile);
          if (module) {
            server.reloadModule(module);
          }
        } else if (file.includes('schedule.csv')) {
          console.log(`📅 Schedule file changed: ${file}`);
          buildSchedule();
          
          // Trigger HMR for the schedule module
          const module = server.moduleGraph.getModuleById(scheduleOutputFile);
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