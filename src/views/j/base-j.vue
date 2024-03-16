<script setup>
import {BASE_I, J_HOME} from "@/router/RouterValue.js";
import {checkLoginState} from "@/utils/check-login-state.js";
import {gProps} from "@/utils/generate.js";
import {expandIcon, renderIcon} from "@/utils/render.js";
import {Home} from "@vicons/fa";
import {NButton, NFlex, NLayout, NLayoutHeader, NMenu} from 'naive-ui'
import {h, onMounted} from "vue";
import {RouterLink} from "vue-router";


onMounted(() => {
	checkLoginState();
	// localStorage.clear();
})

const menuOptions = [
	{
		label: () =>
			h(
				RouterLink,
				gProps(J_HOME.name),
				{default: () => '首页'}
			),
		key: 'm-debit',
		icon: renderIcon(Home)
	},
]
</script>

<template>
	<n-layout-header class="h-3em" position="absolute">
		<n-flex class="h-3em items-center" style="flex-wrap: nowrap">
			<n-menu
				:collapsed-icon-size="16"
				:expand-icon="expandIcon"
				:options="menuOptions"
				class="font-size-5"
				mode="horizontal"
			/>
			<router-link :to="BASE_I">
				<n-button type="info">
					神秘的地方
				</n-button>
			</router-link>
		</n-flex>
	</n-layout-header>
	<n-layout :native-scrollbar="false" class="absolute top-3em bottom-0 left-0 right-0 bg-#00bd7e"
	          content-style="padding: .5em;">
		<div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, dicta doloremque exercitationem fugit
			ipsa iste iure modi nemo optio, porro quia quidem sed suscipit temporibus veniam veritatis vitae voluptate
			voluptates.
		</div>
		<div>Beatae cum cupiditate deleniti dignissimos dolor doloremque incidunt ipsam labore libero, maxime minima
			placeat rem sapiente, sint voluptates. Adipisci animi blanditiis, cupiditate doloremque harum id libero maiores
			odit quisquam ratione.
		</div>
		<div>Aliquid aut consectetur corporis cupiditate, debitis dignissimos est, ex explicabo facere ipsa maxime,
			molestiae molestias necessitatibus officia perspiciatis repellendus totam ut vitae voluptas voluptates. At
			culpa doloremque fugiat magnam. Eaque?
		</div>
		<div>Distinctio ea esse quo? Aliquid architecto assumenda commodi corporis delectus deserunt doloremque earum
			facere iste modi, molestiae, nemo officia, quae quis sunt temporibus tenetur vero. Culpa est eveniet suscipit
			voluptates.
		</div>
		<div>Animi architecto assumenda commodi consequuntur dicta, dolores eligendi esse excepturi exercitationem facere
			facilis labore, magnam maxime mollitia nemo nesciunt nulla pariatur ratione reiciendis rem repellendus
			similique sit temporibus velit voluptatum?
		</div>
		<div>Ab alias aliquam aperiam dolores eius et, eum expedita explicabo facere harum itaque laudantium libero minima
			neque nostrum odit perspiciatis praesentium quod quos repellendus rerum saepe soluta, tenetur velit, voluptate!
		</div>
		<div>Animi esse, eveniet odio officia rem sunt voluptatem. Asperiores dignissimos ducimus eius esse et, explicabo
			impedit incidunt iste molestias odit pariatur quidem tenetur. Consequatur dolor inventore iste quae tenetur
			voluptates?
		</div>
		<div>Aut dolore exercitationem rem reprehenderit repudiandae! Animi cum, cupiditate delectus deleniti dignissimos
			dolore doloremque eius eum fugit ipsa iure laborum libero nam natus nihil quibusdam quidem repellat saepe
			sequi, temporibus!
		</div>
		<div>Blanditiis dolorem inventore itaque voluptate. A, aliquid at consequatur corporis cupiditate dolor eaque
			eveniet expedita magnam magni maiores maxime nemo non nostrum nulla obcaecati quas, qui quia quidem ratione
			voluptates.
		</div>
		<div>Aliquid asperiores at beatae eaque illum in, magni mollitia nobis odio quam quas quasi, quis quisquam ratione
			sapiente, similique veritatis vitae? Architecto ducimus harum, inventore maxime officia saepe veniam
			voluptates?
		</div>
		<div>Ad aut autem consectetur dolores, ea eius eligendi error harum labore libero mollitia neque officiis pariatur
			perspiciatis provident quaerat temporibus. Adipisci nesciunt nihil officia qui quis quo rerum suscipit velit?
		</div>
		<div>Accusamus aspernatur assumenda autem corporis cum debitis, distinctio dolorem dolorum earum eos, ipsam
			laborum maiores minus non odit optio quae quam quo recusandae repellat reprehenderit sapiente sit ullam
			veritatis vitae?
		</div>
		<div>Assumenda ducimus error fugiat harum ipsum molestias reprehenderit voluptatem? Animi, beatae dolorum enim,
			harum in inventore nemo quaerat, quam quas quo recusandae reiciendis rem repellat temporibus vel. Corporis,
			quam, quos?
		</div>
		<div>Animi, distinctio dolore eius, enim excepturi expedita facere inventore ipsum molestias pariatur quia
			quisquam quos ratione reiciendis veniam, vitae voluptate. Culpa delectus eveniet excepturi expedita iste,
			praesentium provident soluta vitae?
		</div>
		<div>A alias aliquid commodi cum dolor doloremque, eligendi et ipsa minus, necessitatibus numquam, quisquam
			sapiente vero voluptatibus voluptatum. Consequatur dolores eligendi enim expedita explicabo, magnam quia
			ratione sapiente sed voluptatem?
		</div>
		<div>Aspernatur assumenda atque autem eum, excepturi illo magnam quo recusandae reprehenderit velit. Eius, nemo,
			placeat! Aliquid animi assumenda corporis, maxime perspiciatis sed soluta veniam? Beatae delectus ea natus rem
			ullam!
		</div>
		<div>Accusamus cum nulla ratione temporibus? Accusantium, ad aliquid asperiores culpa delectus dolore dolorem
			dolores excepturi explicabo harum impedit modi necessitatibus omnis placeat quia, quibusdam quidem quo quod
			totam veniam voluptates.
		</div>
		<div>A ab aliquid aperiam assumenda atque autem consectetur deserunt dolor esse et eveniet excepturi illum ipsam
			maiores molestias neque nihil nulla pariatur perferendis perspiciatis quae, saepe similique sint sit vel.
		</div>
		<div>Accusamus, accusantium adipisci aliquid architecto asperiores consequatur, culpa earum eveniet illum natus
			qui quo similique sit soluta tempore tenetur vel, veniam. Consequatur eos error expedita explicabo hic nihil
			reprehenderit. Molestias?
		</div>
		<div>Alias dolorum eaque esse explicabo id maxime nam neque nihil qui sit soluta, voluptatem. Amet deserunt libero
			magni nostrum quaerat quidem unde. Atque consequatur, distinctio dolor iste neque quaerat rerum.
		</div>
		<div>Ab corporis deserunt esse iure nisi obcaecati quos sapiente? Eum illo mollitia repellat temporibus ut.
			Aliquam aspernatur distinctio ea, facere illum incidunt libero magni officiis tempora voluptatum. Ipsa, quod,
			unde.
		</div>
		<div>Aspernatur culpa debitis dolor dolores doloribus ea facere fugit, inventore iure laborum modi natus
			perspiciatis quae quod, reiciendis rerum sequi tenetur velit veritatis voluptas. Aut cum harum nobis voluptatem
			voluptates.
		</div>
		<div>Aliquam autem doloremque obcaecati. Consequuntur deleniti doloremque, earum eligendi, ex fugiat hic illo
			incidunt neque nihil nobis omnis porro quae quam quod rem sit soluta tempore! Ad laboriosam nam repellat.
		</div>
		<div>Ad aliquid autem beatae deserunt dolorem, molestias nemo obcaecati possimus quam reiciendis repudiandae,
			rerum saepe temporibus unde vel? Blanditiis consequatur nam perspiciatis. Assumenda autem dolorum expedita
			ipsa, maxime obcaecati repellat!
		</div>
		<div>Amet consectetur eaque eos est fugiat, hic inventore ipsa ipsam maiores, molestiae numquam reiciendis
			repellat reprehenderit! Aliquam, aspernatur assumenda deserunt dolor fuga illo necessitatibus nisi non placeat
			soluta totam, voluptatum?
		</div>
		<div>A autem, beatae enim, fuga iste iusto molestiae nulla obcaecati odio porro possimus reprehenderit ut! A
			aliquid consequatur, est expedita id incidunt nisi officiis quasi reiciendis rerum. Laudantium, nemo,
			perferendis!
		</div>
		<div>Ab eum illo inventore laboriosam libero molestias necessitatibus omnis quae quam vitae. Aperiam asperiores,
			deserunt dolore eius fuga impedit ipsam numquam optio perspiciatis saepe, similique sit sunt voluptas
			voluptatibus voluptatum.
		</div>
		<div>Dicta, dignissimos doloremque ea error facilis fugit harum, molestias necessitatibus omnis quae qui saepe
			sequi sit tenetur veritatis? Eligendi officiis quam sed temporibus voluptatum? Amet debitis delectus esse
			repellendus vitae?
		</div>
		<div>Ab, alias, asperiores autem commodi deserunt dolores dolorum est in incidunt iusto, maiores maxime neque
			nesciunt porro quaerat quis quo vero voluptates? In maxime modi nesciunt nulla officiis, tempora vel!
		</div>
		<div>Adipisci magni numquam officiis rerum, veritatis vero. Accusantium ad alias autem ducimus ea eligendi et ex
			facere in, incidunt magnam maiores maxime, molestias nam nemo optio temporibus unde voluptate voluptatem.
		</div>
	</n-layout>

</template>

<style scoped>
</style>