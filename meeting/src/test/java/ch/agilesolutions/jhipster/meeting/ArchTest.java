package ch.agilesolutions.jhipster.meeting;

import com.tngtech.archunit.core.domain.JavaClasses;
import com.tngtech.archunit.core.importer.ClassFileImporter;
import com.tngtech.archunit.core.importer.ImportOption;
import org.junit.jupiter.api.Test;

import static com.tngtech.archunit.lang.syntax.ArchRuleDefinition.noClasses;

class ArchTest {

    @Test
    void servicesAndRepositoriesShouldNotDependOnWebLayer() {

        JavaClasses importedClasses = new ClassFileImporter()
            .withImportOption(ImportOption.Predefined.DO_NOT_INCLUDE_TESTS)
            .importPackages("ch.agilesolutions.jhipster.meeting");

        noClasses()
            .that()
                .resideInAnyPackage("ch.agilesolutions.jhipster.meeting.service..")
            .or()
                .resideInAnyPackage("ch.agilesolutions.jhipster.meeting.repository..")
            .should().dependOnClassesThat()
                .resideInAnyPackage("..ch.agilesolutions.jhipster.meeting.web..")
        .because("Services and repositories should not depend on web layer")
        .check(importedClasses);
    }
}
