import { PluginSettingTab, Setting } from 'obsidian';
import { Logger } from '../utils';
import { IncrementalIdPlugin } from '../incremental-id-plugin';
import { IdDefinition, IncrementalIdConfiguration } from '../configuration/incremental-id-configuration';

export class IncrementalIdPluginSettingTab extends PluginSettingTab {
  constructor(private plugin: IncrementalIdPlugin, private config: IncrementalIdConfiguration) {
    super(app, plugin);
  }

  addAddIdDefinitionSection() {
    const isIdDefinitionValid = (def: IdDefinition) => {
      let invalid = false;
      if (def.name.length < 3 || this.config.configuration.idDefinitions.find(({ name }) => name === def.name)) {
        Logger.error(new Error('You need provide unique name with at least 3 characters'));
        invalid = true;
      }
      if (
        def.prefix.length < 2 ||
        !/^[A-Z]*$/.test(def.prefix) ||
        this.config.configuration.idDefinitions.find(({ prefix }) => prefix === def.prefix)
      ) {
        Logger.error(new Error('You need provide unique prefix from uppercase letters with at least 2 characters'));
        invalid = true;
      }
      if (!Number.isInteger(def.currentIteration) || def.currentIteration < 0) {
        Logger.error(new Error('You need provide positive integer or 0'));
        invalid = true;
      }
      return !invalid;
    };

    let tempIdDefinition: IdDefinition = {
      prefix: '',
      currentIteration: 0,
      name: '',
    };

    const s = new Setting(this.containerEl)
      .addText((cb) => {
        cb.setPlaceholder('Provide name for your ID')
          .setValue(tempIdDefinition.name)
          .onChange(async (newIdName: string) => {
            tempIdDefinition.name = newIdName;
          });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide prefix for your ID, only uppercase letters allowed')
          .setValue(tempIdDefinition.prefix)
          .onChange(async (newPrefix: string) => {
            tempIdDefinition.prefix = newPrefix;
          });
      })
      .addText((cb) => {
        cb.setPlaceholder('Provide current iteration for your ID')
          .setValue(tempIdDefinition.currentIteration.toString())
          .onChange(async (newIdIteration: string) => {
            tempIdDefinition.currentIteration = Number(newIdIteration);
          });
      })
      .addButton((cb) => {
        cb.setButtonText('Add new ID definition')
          .setCta()
          .onClick(async () => {
            if (!isIdDefinitionValid(tempIdDefinition)) {
              return;
            }
            this.config.configuration.idDefinitions.push(tempIdDefinition);
            this.plugin.commandHandler.add(null, tempIdDefinition);
            tempIdDefinition = {
              prefix: '',
              currentIteration: 0,
              name: '',
            };

            await this.config.save();
            // Force refresh
            this.display();
          });
      });
    s.infoEl.remove();
  }

  addIdDefinitionSettingsSection(): void {
    this.containerEl.createEl('h2', { text: 'Provide your IDs' });

    const desc = document.createDocumentFragment();
    desc.append('Particular IDs allow you to have a few separated IDs for different types of notes.');

    new Setting(this.containerEl).setDesc(desc);

    this.config.configuration.idDefinitions.forEach((idDefinition, index) => {
      const s = new Setting(this.containerEl)
        .addText((cb) => {
          cb.setPlaceholder('Provide name for your ID')
            .setValue(idDefinition.name)
            .onChange(async (newIdName: string) => {
              if (newIdName && this.config.configuration.idDefinitions.find(({ name }) => name === newIdName)) {
                Logger.error(new Error('You need provide unique name'));
                return;
              }
              const updated: IdDefinition = {
                ...this.config.configuration.idDefinitions[index],
                name: newIdName,
              };
              this.plugin.commandHandler.add(this.config.configuration.idDefinitions[index], updated);
              this.config.configuration.idDefinitions[index] = updated;
              await this.config.save();
            });
        })
        .addText((cb) => cb.setDisabled(true).setValue(idDefinition.prefix))
        .addText((cb) => {
          cb.setPlaceholder('Provide current iteration for your ID')
            .setValue(idDefinition.currentIteration.toString())
            .onChange(async (newIdIteration: string) => {
              const parsedIterationNumber = Number(newIdIteration);
              if (!Number.isInteger(parsedIterationNumber) || parsedIterationNumber < 0) {
                Logger.error(new Error('You need provide positive integer'));
                return;
              }
              const updated: IdDefinition = {
                ...this.config.configuration.idDefinitions[index],
                currentIteration: parsedIterationNumber,
              };
              this.plugin.commandHandler.add(this.config.configuration.idDefinitions[index], updated);
              this.config.configuration.idDefinitions[index] = updated;
              await this.config.save();
            });
        })
        .addButton((cb) => {
          cb.setButtonText('Delete')
            .setCta()
            .onClick(async () => {
              this.config.configuration.idDefinitions.splice(index, 1);
              await this.config.save();
              this.plugin.commandHandler.remove(this.config.configuration.idDefinitions[index]);

              // Force refresh
              this.display();
            });
        });
      s.infoEl.remove();
    });

    // new Setting(this.containerEl).addButton((cb) => {
    //   cb.setButtonText('Add new ID definition')
    //     .setCta()
    //     .onClick(async () => {
    //       this.config.configuration.idDefinitions.push({
    //         currentIteration: 0,
    //         name: '',
    //         prefix: '',
    //       });
    //       await this.config.save();
    //       // Force refresh
    //       this.display();
    //     });
    // });
  }

  display() {
    this.containerEl.empty();
    this.addIdDefinitionSettingsSection();
    this.addAddIdDefinitionSection();
  }
}
