import { Command } from 'commander';
import { AbstractCommand, Input } from './interface';
import { validateLanguage } from '../utils/validate-language';
import { NextAction } from '../actions';

export class NextCommand extends AbstractCommand {
  constructor(protected readonly action: NextAction) {
    super(action);
  }

  public load(program: Command): void {
    program
      .command('next <language>')
      .allowUnknownOption()
      .description('Find next kata for given language')
      .action(async (language: string) => {
        try {
          const inputs: Input[] = [];
          validateLanguage(language);
          inputs.push({ name: 'language', value: language });
          await this.action.handle(inputs);
        } catch (err) {
          console.log(err.message);
          process.exit(0);
        }
      });
  }
}
